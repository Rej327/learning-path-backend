import request from "supertest";
import { app } from "../index"; // import exported app

describe("Pokemon Controller Routes", () => {

    describe("GET /pokemon/name/:name", () => {
        it("returns Pokemon for valid name", async () => {
            const res = await request(app).get("/pokemon/name/pikachu");
            expect(res.status).toBe(200);
            expect(res.body.pokemon).not.toBeNull();
            expect(res.body.pokemon.name.toLowerCase()).toBe("pikachu");
        });

        it("returns error for invalid name", async () => {
            const res = await request(app).get("/pokemon/name/unknownpokemon");
            expect(res.status).toBe(200);
            expect(res.body.pokemon).toBeNull();
            expect(res.body.message).toContain("couldn't find");
        });
    });

    describe("GET /pokemon/type/:type", () => {
        it("returns Pokemon array for valid type", async () => {
            const res = await request(app).get("/pokemon/type/electric");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.pokemon)).toBe(true);
            expect(res.body.pokemon.length).toBeGreaterThan(0);
        });

        it("returns empty array for invalid type", async () => {
            const res = await request(app).get("/pokemon/type/unknown");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.pokemon)).toBe(true);
            expect(res.body.pokemon.length).toBe(0);
            expect(res.body.message).toContain("No Pokemon of type");
        });
    });
});
