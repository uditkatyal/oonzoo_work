const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/userControllers");

router.route("/signup").post(signUp);
router.route("/login").post(login);
// router.post("/signup", signUp);

module.exports = router;
