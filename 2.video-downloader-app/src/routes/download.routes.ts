import { Router } from "express";
import { downloadHandler } from "../controllers/download.controller";

const router = Router();

router.post("/download", downloadHandler);

export default router;
