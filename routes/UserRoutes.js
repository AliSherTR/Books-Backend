const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/sign-up").post(authController.signUp);
router.post("/sign-in", authController.login);

module.exports = router;
