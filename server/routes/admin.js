const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");

// routes for
router.get("/", adminController.getTransition);

// hotel
router.get("/hotels", adminController.getHotels);

router.post("/hotels/delete", adminController.postDeleteHotel);

router.get("/hotels/newHotel/:hotelId", adminController.getNewHotel);

router.post("/hotels/newHotel", adminController.postNewHotel);

// room
router.get("/rooms", adminController.getRooms);

router.post("/rooms/delete", adminController.postDeleteRoom);

router.get("/hotels/newRoom/:roomId", adminController.getNewRoom);

router.post("/hotels/newRoom", adminController.postNewRoom);

// export routes
module.exports = router;
