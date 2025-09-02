const axios = require("axios");

const API_KEY = "8b2de2c93e-2f33a4822a-t1y5xr";

async function getExchangeRate(fromCurrency, toCurrency, fromValue) {
    const url = `https://api.fastforex.io/convert?from=${fromCurrency}&to=${toCurrency}&amount=${fromValue}&api_key=${API_KEY}`;
    const response = await axios.get(url);

    if (!response.data || !response.data.result || !response.data.result[toCurrency]) {
        throw new Error("Failed to fetch exchange rate");
    }

    const convertedValue = response.data.result[toCurrency];
    const rate = convertedValue / fromValue;

    return { rate, convertedValue };
}

async function convert(fromValue, fromCurrency, toCurrency) {
    const { rate, convertedValue } = await getExchangeRate(fromCurrency, toCurrency, fromValue);

    return {
        fromValue,
        fromCurrency,
        toCurrency,
        rate,
        convertedValue,
    };
}

module.exports = { getExchangeRate, convert };
