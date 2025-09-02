const { shortenUrl, getOriginal, listAll } = require("../services/urlStore");

function createShortUrl(req, res) {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "url is required" });
        }
        if (typeof url !== "string") {
            return res.status(400).json({ error: "url must be a string" });
        }

        let normalized;
        try {

            normalized = new URL(url).toString();
        } catch {

            if (url.startsWith("www.")) {
                normalized = new URL("http://" + url).toString();
            } else {
                return res.status(400).json({ error: "Invalid URL format" });
            }
        }

        const { code, shortUrl } = shortenUrl(normalized);
        return res.status(201).json({ code, shortUrl });
    } catch (err) {
        return res.status(400).json({ error: err.message || "Invalid request" });
    }
}

function redirectToOriginal(req, res) {
    const { code } = req.params;
    const original = getOriginal(code);
    if (!original) return res.status(404).send("Not found");
    return res.redirect(original);
}

function listUrls(_req, res) {
    return res.json(listAll());
}

module.exports = { createShortUrl, redirectToOriginal, listUrls };
