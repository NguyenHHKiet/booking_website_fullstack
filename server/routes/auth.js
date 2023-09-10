const express = require("express");

const router = express.Router();

const authController = require("../controller/auth");

// routes for
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// export routes
module.exports = router;
