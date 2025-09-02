const express = require("express");
const bodyParser = require("body-parser");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
app.use(bodyParser.json());
app.use(urlRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
