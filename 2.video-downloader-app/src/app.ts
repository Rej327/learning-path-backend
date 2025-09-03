import express from "express";
import cors from "cors";
import downloadRoutes from "./routes/download.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/video", downloadRoutes);

export default app;
