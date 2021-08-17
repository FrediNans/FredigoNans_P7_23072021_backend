const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const commentControl = require("../controllers/comment");

router.post("/new", commentControl.createComment);

module.exports = router;
