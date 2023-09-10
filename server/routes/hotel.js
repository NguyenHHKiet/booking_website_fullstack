const express = require("express");

const router = express.Router();

const hotelController = require("../controller/hotel");

// routes for
router.get("/hotels", hotelController.getHotels);

router.get("/:hotelID", hotelController.getHotel);

router.post("/hotels", hotelController.postHotels);

router.post("/booking", hotelController.booking);

router.get("/getBookedRoom/:hotelId", hotelController.getBookedRoom);

// export routes
module.exports = router;
