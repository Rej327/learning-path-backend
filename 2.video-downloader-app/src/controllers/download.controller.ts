import type { Request, Response } from "express";
import { downloadVideo } from "../services/download.service";

export async function downloadHandler(req: Request, res: Response) {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "Missing YouTube URL" });

        const result = await downloadVideo(url);

        res.json({
            file: {
                name: result.file.name,
                type: result.file.type,
                size: result.file.size,
            },
            message: result.message,
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
