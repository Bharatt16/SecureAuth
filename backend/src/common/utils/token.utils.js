import crypto from "crypto";

/**
 * Hashes a token using SHA256 before storing in DB
 * Similar to how passwords are hashed, but deterministic.
 */
const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

export { hashToken };