const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const commentControl = require("../controllers/comment");

router.post("/new", multer, commentControl.createComment);
router.get("/all/:id", commentControl.getAllCommentForThisPost);

module.exports = router;
