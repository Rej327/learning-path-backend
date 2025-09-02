const { generateCode, normalizeUrl } = require("./urlShortener");

const store = new Map();   // code -> record
const reverse = new Map(); // original -> code

function shortenUrl(originalUrl) {
    const normalized = normalizeUrl(originalUrl);

    if (reverse.has(normalized)) {
        const existing = reverse.get(normalized);
        return { code: existing, shortUrl: getShortUrl(existing) };
    }

    let code;
    let attempts = 0;
    do {
        code = generateCode(6);
        attempts++;
        if (attempts > 10) throw new Error("Failed to generate unique code");
    } while (store.has(code));

    const rec = {
        original: normalized,
        code,
        createdAt: new Date().toISOString(),
        hits: 0,
    };

    store.set(code, rec);
    reverse.set(normalized, code);

    return { code, shortUrl: getShortUrl(code) };
}

function getOriginal(code) {
    const rec = store.get(code);
    if (!rec) return null;
    rec.hits++;
    return rec.original;
}

function getShortUrl(code, host = "http://localhost:3000") {
    return `${host}/${code}`;
}

function listAll() {
    return Array.from(store.values());
}

module.exports = { shortenUrl, getOriginal, getShortUrl, listAll };
