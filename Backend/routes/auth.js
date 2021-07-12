const express = require("express");
const router = express.Router();

const AuthCtrl = require("../controllers/auth");

//Signup/Register Router
router.post("/register", AuthCtrl.registerUser);

//Login Router
router.post("/login", AuthCtrl.loginUser);

//Logout Router
router.post("/logout", AuthCtrl.logoutUser);

module.exports = router;
