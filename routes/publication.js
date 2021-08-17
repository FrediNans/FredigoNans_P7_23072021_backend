const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const publicationControl = require("../controllers/publication");

router.post("/new", multer, publicationControl.createPublication);
router.get("/all", publicationControl.getAllPost);
router.put("/modifyPost", multer, publicationControl.modifyPublication);
router.delete("/deletePost/:id", multer, publicationControl.deletePost);

module.exports = router;
