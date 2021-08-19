const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const commentControl = require("../controllers/comment");

router.post("/new", multer, commentControl.createComment);
router.get("/:id", commentControl.getOneComment);
router.delete("/deleteComment/:id", commentControl.deleteComment);
router.put("/modifyComment/:id", commentControl.modifyComment);

module.exports = router;
