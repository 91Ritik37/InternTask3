const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require('../controllers/userController')

const verification = require("../protected/protected")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgotpassword", verification, forgotPassword)

module.exports = router;