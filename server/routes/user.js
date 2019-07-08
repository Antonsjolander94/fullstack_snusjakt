const express = require("express");
const router = express.Router();
const isVerified = require("../validation/verifyToken");
const UserController = require("../controllers/user");

router.route("/").get(isVerified, UserController.index);
router.route("/register").post(UserController.registerUser);
router.route("/login").post(UserController.loginUser);

module.exports = router;
