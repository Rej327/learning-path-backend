const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./src/routes/routes.js");

const app = express();
app.use(bodyParser.json());

app.use("/todos", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ TodoList app running on http://localhost:${PORT}`);
});
