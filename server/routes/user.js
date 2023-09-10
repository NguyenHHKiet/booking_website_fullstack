const express = require("express");

const router = express.Router();

const userController = require("../controller/user");

// routes for
router.get("/transition", userController.getTransition);

// export routes
module.exports = router;
