import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import bookmarkRoutes from "../src/routes/bookmarkRoutes";

const app = express();
app.use(bodyParser.json());
app.use("/bookmarks", bookmarkRoutes);

describe("Bookmark API", () => {
    let createdId: number;

    it("should create a new bookmark", async () => {
        const res = await request(app)
            .post("/bookmarks")
            .send({ url: "https://google.com", title: "Google" });

        expect(res.status).toBe(201);
        expect(res.body.bookmark).toHaveProperty("id");
        expect(res.body.bookmark.url).toBe("https://google.com");
        expect(res.body.bookmark.title).toBe("Google");

        createdId = res.body.bookmark.id;
    });

    it("should fetch all bookmarks", async () => {
        const res = await request(app).get("/bookmarks");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.bookmarks)).toBe(true);
        expect(res.body.bookmarks.length).toBeGreaterThan(0);
    });

    it("should fetch a single bookmark by ID", async () => {
        const res = await request(app).get(`/bookmarks/${createdId}`);
        expect(res.status).toBe(200);
        expect(res.body.bookmark.id).toBe(createdId);
    });

    it("should update a bookmark", async () => {
        const res = await request(app)
            .put(`/bookmarks/${createdId}`)
            .send({ url: "https://youtube.com", title: "YouTube" });

        expect(res.status).toBe(200);
        expect(res.body.bookmark.url).toBe("https://youtube.com");
        expect(res.body.bookmark.title).toBe("YouTube");
    });

    it("should delete a bookmark", async () => {
        const res = await request(app).delete(`/bookmarks/${createdId}`);
        expect(res.status).toBe(200);
        expect(res.body.deleted.id).toBe(createdId);
    });

    it("should return 404 when fetching deleted bookmark", async () => {
        const res = await request(app).get(`/bookmarks/${createdId}`);
        expect(res.status).toBe(404);
    });
});
