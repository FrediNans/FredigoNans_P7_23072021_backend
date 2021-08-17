const express = require("express");
const router = express.Router();

const userControl = require("../controllers/user");

router.post("/signup", userControl.signup);
router.post("/login", userControl.login);
router.get("/account", userControl.getAccount);
router.put("/modifyAccount", userControl.modifyAccount);

module.exports = router;
