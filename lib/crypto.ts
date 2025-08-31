// lib/crypto.ts
import crypto from "crypto";

function getKey(): Buffer {
  const raw = process.env.NOTE_ENCRYPTION_KEY;
  if (!raw) throw new Error("Missing NOTE_ENCRYPTION_KEY");
  // Support base64 or hex
  if (/^[A-Za-z0-9+/=]+$/.test(raw)) {
    // likely base64
    const buf = Buffer.from(raw, "base64");
    if (buf.length !== 32) throw new Error("NOTE_ENCRYPTION_KEY must decode to 32 bytes");
    return buf;
  }
  // else assume hex
  const buf = Buffer.from(raw, "hex");
  if (buf.length !== 32) throw new Error("NOTE_ENCRYPTION_KEY must be 32 bytes (hex)");
  return buf;
}

export function encryptText(plain: string) {
  const key = getKey();
  const iv = crypto.randomBytes(12); // GCM 96-bit IV
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    ct: ct.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
  };
}

export function decryptText(enc: { ct: string; iv: string; tag: string }) {
  const key = getKey();
  const iv = Buffer.from(enc.iv, "base64");
  const ct = Buffer.from(enc.ct, "base64");
  const tag = Buffer.from(enc.tag, "base64");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
  return pt.toString("utf8");
}