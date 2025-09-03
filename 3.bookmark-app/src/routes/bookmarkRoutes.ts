import { Router } from "express";
import { BookmarkController } from "../controllers/bookmarkControllers";

const router = Router();

router.post("/", BookmarkController.createBookmark);
router.get("/", BookmarkController.readBookmarks);
router.get("/:id", BookmarkController.readBookmark);
router.put("/:id", BookmarkController.updateBookmark);
router.delete("/:id", BookmarkController.deleteBookmark);

export default router;
