const crypto = require("crypto");

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = ALPHABET.length;

function toBase62(num) {
    if (num === 0) return ALPHABET[0];
    let s = "";
    while (num > 0) {
        s = ALPHABET[num % BASE] + s;
        num = Math.floor(num / BASE);
    }
    return s;
}

function generateCode(length = 6) {
    const bytes = crypto.randomBytes(4);
    const num = bytes.readUInt32BE(0);
    let code = toBase62(num);
    if (code.length >= length) return code.slice(0, length);
    while (code.length < length) code = ALPHABET[0] + code;
    return code;
}

function normalizeUrl(input) {
    try {
        const u = new URL(input);
        return u.toString();
    } catch {
        try {
            const u = new URL("http://" + input);
            return u.toString();
        } catch {
            throw new Error("Invalid URL");
        }
    }
}

module.exports = { generateCode, normalizeUrl };
