const { Currency } = require("../enums/currency.js");
const { convert } = require("../services/exchangeService.js");

async function convertCurrency(req, res) {
    try {
        const { fromValue, fromCurrency, toCurrency } = req.body;

        // Check required fields
        if (!fromValue || !fromCurrency || !toCurrency) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Validate currencies against enum
        if (!Object.values(Currency).includes(fromCurrency)) {
            return res.status(400).json({ error: `Invalid fromCurrency. Allowed: ${Object.values(Currency).join(", ")}` });
        }
        if (!Object.values(Currency).includes(toCurrency)) {
            return res.status(400).json({ error: `Invalid toCurrency. Allowed: ${Object.values(Currency).join(", ")}` });
        }

        // Perform conversion
        const result = await convert(fromValue, fromCurrency, toCurrency);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { convertCurrency };
