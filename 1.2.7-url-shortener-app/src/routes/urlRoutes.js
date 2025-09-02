const express = require("express");
const { createShortUrl, redirectToOriginal, listUrls } = require("../controllers/urlController");

const router = express.Router();

router.post("/api/shorten", createShortUrl);
router.get("/:code", redirectToOriginal);
router.get("/api/list", listUrls);

module.exports = router;
