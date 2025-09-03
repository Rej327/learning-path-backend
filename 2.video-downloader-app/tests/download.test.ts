import request from "supertest";
import app from "../src/app";

describe("Video Downloader API", () => {
    it("should return error if url is missing", async () => {
        const res = await request(app).post("/video/download").send({});
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error", "Missing YouTube URL");
    });

    it("should reject invalid YouTube URL", async () => {
        const res = await request(app).post("/video/download").send({
            url: "not-a-valid-url"
        });
        expect(res.status).toBe(500); // our service throws error
        expect(res.body).toHaveProperty("error");
    });

    // ⚠️ This will actually try to download from YouTube
    // Better to mock downloadVideo in a real project
    it("should accept valid YouTube URL", async () => {
        const res = await request(app).post("/video/download").send({
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("file");
        expect(res.body).toHaveProperty("message");
    }, 60000); // increase timeout to 60s
});
