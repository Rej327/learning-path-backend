const calculatorService = require("../services/calculatorService.js");

const add = (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return res.status(400).json({ message: "num1 and num2 must be numbers" });
    }
    const result = calculatorService.add(num1, num2);
    res.json({ result });
};

const subtract = (req, res) => {
    const { num } = req.body;
    if (typeof num !== "number") {
        return res.status(400).json({ message: "num must be a number" });
    }
    const result = calculatorService.subtract(num);
    res.json({ result });
};

const multiply = (req, res) => {
    const { num } = req.body;
    if (typeof num !== "number") {
        return res.status(400).json({ message: "num must be a number" });
    }
    const result = calculatorService.multiply(num);
    res.json({ result });
};

const divide = (req, res) => {
    const { num } = req.body;
    if (typeof num !== "number") {
        return res.status(400).json({ message: "num must be a number" });
    }
    try {
        const result = calculatorService.divide(num);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getValue = (req, res) => {
    const result = calculatorService.getValue();
    res.json({ result });
};

const reset = (req, res) => {
    const result = calculatorService.reset();
    res.json({ result });
};

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    getValue,
    reset,
};
