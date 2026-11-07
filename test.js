const assert = require('assert');
const crypto = require('crypto');

function base32ToBytes(b32) {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const s = b32.toUpperCase().replace(/[\s=\-]/g, '');
  let bits = 0, val = 0;
  const out = [];
  for (const c of s) {
    const idx = alpha.indexOf(c);
    if (idx < 0) throw new Error('Invalid: ' + c);
    val = (val << 5) | idx;
    bits += 5;
    if (bits >= 8) { out.push((val >>> (bits - 8)) & 0xff); bits -= 8; }
  }
  return new Uint8Array(out);
}

function computeTOTP(secret, timestampSec = Math.floor(Date.now() / 1000)) {
  const keyBytes = Buffer.from(base32ToBytes(secret));
  const c = Math.floor(timestampSec / 30);
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(c));

  const hmac = crypto.createHmac('sha1', keyBytes);
  hmac.update(buf);
  const sig = hmac.digest();

  const off = sig[19] & 0x0f;
  const code = (((sig[off] & 0x7f) << 24) | (sig[off+1] << 16) | (sig[off+2] << 8) | sig[off+3]) % 1000000;
  return {
    code: String(code).padStart(6, '0'),
    remaining: 30 - (timestampSec % 30)
  };
}

console.log("Running 2FA TOTP tests...");

// 1. Base32 decoding byte comparison (Hello! + 0xdeadbeef)
const bytes = Array.from(base32ToBytes("JBSWY3DPEHPK3PXP"));
assert.deepStrictEqual(bytes, [72, 101, 108, 108, 111, 33, 222, 173, 190, 239]);

// 2. Base32 case-insensitivity and formatting
assert.deepStrictEqual(base32ToBytes("jbsw y3dp-ehpk3pxp"), base32ToBytes("JBSWY3DPEHPK3PXP"));

// 3. Invalid character throws
assert.throws(() => base32ToBytes("INVALID189!"), /Invalid/);

// 4. RFC 6238 test vectors (HMAC-SHA1, 30s step)
// Secret: "12345678901234567890" -> Base32: "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ"
const rfcSecret = "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ";

// Test at T = 59s: Expected "287082"
const t59 = computeTOTP(rfcSecret, 59);
assert.strictEqual(t59.code, "287082");
assert.strictEqual(t59.remaining, 1);

// Test at T = 1111111109s: Expected "081804"
const t111 = computeTOTP(rfcSecret, 1111111109);
assert.strictEqual(t111.code, "081804");

// Test at T = 1234567890s: Expected "005924"
const t123 = computeTOTP(rfcSecret, 1234567890);
assert.strictEqual(t123.code, "005924");

console.log("All TOTP & Base32 tests passed successfully!");
