import express, { Request, Response, NextFunction } from "express";
import request from "supertest";

function mockAuth(isAuthenticated: boolean, isAuthorized: boolean) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!isAuthenticated) return res.status(401).json({ message: "Not Authenticated" });
        if (!isAuthorized) return res.status(403).json({ message: "Not Authorized" });
        next();
    };
}

const app = express();
app.get("/protected", mockAuth(true, true), (req, res) => res.json({ message: "Success" }));

describe("Auth Middleware", () => {
    it("blocks if not authenticated", async () => {
        const app2 = express();
        app2.get("/protected", mockAuth(false, true), (req, res) => res.json({ message: "Success" }));
        const res = await request(app2).get("/protected");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Not Authenticated");
    });

    it("blocks if authenticated but not authorized", async () => {
        const app3 = express();
        app3.get("/protected", mockAuth(true, false), (req, res) => res.json({ message: "Success" }));
        const res = await request(app3).get("/protected");
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Not Authorized");
    });

    it("proceeds if authenticated and authorized", async () => {
        const res = await request(app).get("/protected");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Success");
    });
});
