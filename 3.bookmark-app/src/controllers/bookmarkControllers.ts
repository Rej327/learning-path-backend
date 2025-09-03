import { Request, Response } from "express";
import { BookmarkModel } from "../models/bookmarkModel";

export class BookmarkController {
    static createBookmark(req: Request, res: Response): void {
        const { url, title } = req.body;
        if (!url || !title) {
            res.status(400).json({ message: "URL and Title are required" });
            return;
        }

        const bookmark = BookmarkModel.create(url, title);
        if (!bookmark) {
            res.status(400).json({ message: "Bookmark already exists" });
            return;
        }

        res.status(201).json({ message: "Bookmark created", bookmark });
    }

    static readBookmark(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const bookmark = BookmarkModel.findById(id);
        if (!bookmark) {
            res.status(404).json({ message: "Bookmark not found" });
            return;
        }
        res.json({ bookmark });
    }

    static readBookmarks(req: Request, res: Response): void {
        const bookmarks = BookmarkModel.findAll();
        res.json({ bookmarks });
    }

    static updateBookmark(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const { url, title } = req.body;
        const bookmark = BookmarkModel.update(id, url, title);

        if (!bookmark) {
            res.status(400).json({ message: "Update failed (duplicate or not found)" });
            return;
        }

        res.json({ message: "Bookmark updated", bookmark });
    }

    static deleteBookmark(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const deleted = BookmarkModel.delete(id);

        if (!deleted) {
            res.status(404).json({ message: "Bookmark not found" });
            return;
        }

        res.json({ message: "Bookmark deleted", deleted });
    }
}

