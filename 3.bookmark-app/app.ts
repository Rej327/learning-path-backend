import express from "express";
import bodyParser from "body-parser";
import bookmarkRoutes from "./src/routes/bookmarkRoutes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/bookmarks", bookmarkRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

