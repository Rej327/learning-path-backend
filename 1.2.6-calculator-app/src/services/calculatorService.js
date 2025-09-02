let value = 0;

const add = (num1, num2) => {
    value = num1 + num2;
    return value;
};

const subtract = (num) => {
    value -= num;
    return value;
};

const multiply = (num) => {
    value *= num;
    return value;
};

const divide = (num) => {
    if (num === 0) {
        throw new Error("Cannot divide by zero");
    }
    value /= num;
    return value;
};

const getValue = () => value;

const reset = () => {
    value = 0;
    return value;
};

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    getValue,
    reset,
};
