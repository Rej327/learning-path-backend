const express = require("express");
const bodyParser = require("body-parser");
const calculatorRoutes = require("./routes/calculatorRoutes.js");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/calculator", calculatorRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Calculator API running on http://localhost:${PORT}`);
});
