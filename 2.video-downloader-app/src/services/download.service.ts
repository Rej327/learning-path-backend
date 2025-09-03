import fs from "fs";
import path from "path";
import ytdl from "@distube/ytdl-core";
import { sanitizeFilename } from "../utils/filename";

export async function downloadVideo(
    url: string,
    outputDir: string = "./downloads"
): Promise<{ file: File; message: string }> {
    if (!ytdl.validateURL(url)) {
        throw new Error("Invalid YouTube URL");
    }

    const info = await ytdl.getInfo(url);
    const title = sanitizeFilename(info.videoDetails.title, "video");
    const filePath = path.resolve(outputDir, `${title}.mp4`);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const videoStream = ytdl(url, { quality: "highest", filter: "audioandvideo" });
    const chunks: Buffer[] = [];

    await new Promise<void>((resolve, reject) => {
        videoStream
            .on("data", (chunk) => chunks.push(chunk))
            .on("end", () => resolve())
            .on("error", reject)
            .pipe(fs.createWriteStream(filePath));
    });

    const buffer = Buffer.concat(chunks);
    const file = new File([buffer], `${title}.mp4`, { type: "video/mp4" });

    return {
        file,
        message: `Downloaded video: ${info.videoDetails.title}`,
    };
}
