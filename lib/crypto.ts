/**
 * Cryptographic Utilities
 * 
 * Provides AES-256-GCM encryption/decryption functions for securing sensitive data.
 * Uses a 32-byte encryption key from environment variables.
 * 
 * This module is ready for use but not currently implemented in the notes feature.
 * Can be integrated to encrypt note content before storing in MongoDB.
 */

import crypto from "crypto";

/**
 * Retrieves and validates the encryption key from environment variables
 * Supports both base64 and hex encoded keys
 */
function getEncryptionKey(): Buffer {
  const rawKey = process.env.NOTE_ENCRYPTION_KEY;
  
  if (!rawKey) {
    throw new Error("Missing NOTE_ENCRYPTION_KEY environment variable");
  }
  
  // Detect and decode base64 format
  if (/^[A-Za-z0-9+/=]+$/.test(rawKey)) {
    const buffer = Buffer.from(rawKey, "base64");
    if (buffer.length !== 32) {
      throw new Error("NOTE_ENCRYPTION_KEY must decode to exactly 32 bytes");
    }
    return buffer;
  }
  
  // Decode hex format
  const buffer = Buffer.from(rawKey, "hex");
  if (buffer.length !== 32) {
    throw new Error("NOTE_ENCRYPTION_KEY must be exactly 32 bytes when hex encoded");
  }
  return buffer;
}

/**
 * Encrypts plain text using AES-256-GCM encryption
 * 
 * @param plainText - The text to encrypt
 * @returns Object containing encrypted data, IV, and authentication tag
 */
export function encryptText(plainText: string) {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM
  
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"), 
    cipher.final()
  ]);
  const authTag = cipher.getAuthTag();
  
  return {
    ciphertext: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    tag: authTag.toString("base64"),
  };
}

/**
 * Decrypts data that was encrypted with encryptText
 * 
 * @param encryptedData - Object containing ciphertext, IV, and auth tag
 * @returns The original plain text
 */
export function decryptText(encryptedData: { 
  ciphertext: string; 
  iv: string; 
  tag: string 
}) {
  const key = getEncryptionKey();
  const iv = Buffer.from(encryptedData.iv, "base64");
  const ciphertext = Buffer.from(encryptedData.ciphertext, "base64");
  const authTag = Buffer.from(encryptedData.tag, "base64");
  
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  
  const decrypted = Buffer.concat([
    decipher.update(ciphertext), 
    decipher.final()
  ]);
  
  return decrypted.toString("utf8");
}