const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");

const publicationControl = require("../controllers/publication");

router.post("/new", publicationControl.createPublication);

module.exports = router;
