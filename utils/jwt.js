import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const ENC_SECRET = process.env.ENC_SECRET; // optional
const ENC_IV = process.env.ENC_IV || "default_iv";

const getPaddedIV = () => {
  const iv = (ENC_IV || "default_iv").padEnd(16, "0");
  if (iv.length !== 16) throw new Error("IV must be exactly 16 characters after padding.");
  return Buffer.from(iv, "utf8");
};

const encrypt = (text) => {
  if (!ENC_SECRET) return text; // no encryption if ENC_SECRET not set
  if (ENC_SECRET.length !== 32) {
    throw new Error("ENC_SECRET must be exactly 32 characters.");
  }

  const iv = getPaddedIV();
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENC_SECRET), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (encryptedText) => {
  if (!ENC_SECRET) return encryptedText; // no decryption if ENC_SECRET not set
  const iv = getPaddedIV();
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENC_SECRET), iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Generate JWT token
export const generateToken = (payload, expiresIn = "3d") => {
  const cloned = { ...payload };
  if (cloned.email) {
    cloned.email = encrypt(cloned.email);
  }
  return jwt.sign(cloned, JWT_SECRET, { expiresIn });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.email) {
      decoded.email = decrypt(decoded.email);
    }
    return decoded;
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
};
