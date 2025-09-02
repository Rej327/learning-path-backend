const express = require("express");
const bodyParser = require("body-parser");
const currencyRoutes = require("./routes/currencyRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api", currencyRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
