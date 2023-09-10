const Transaction = require("../model/transaction");
const Hotel = require("../model/hotel");
const User = require("../model/user");
const Room = require("../model/room");

exports.getTransition = (req, res, next) => {
    Transaction.find()
        .populate([
            { path: "user", model: "User", select: "email fullName -_id" },
            { path: "hotel", model: "Hotel", select: "rooms name title -_id" },
        ])
        .then(async (results) => {
            const qtyOrders = await Transaction.estimatedDocumentCount();
            const qtyUser = await User.estimatedDocumentCount();

            const earings = results.reduce((acc, item) => {
                return acc + item.price;
            }, 0);

            return await res.status(200).send({
                transition: results,
                qtyOrders,
                qtyUser,
                earings,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// Hotels
exports.getHotels = (req, res) => {
    Hotel.find()
        .then((hotels) => {
            res.status(200).send({ hotels });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDeleteHotel = async (req, res) => {
    try {
        const { hotelID } = req.body;

        const results = await Transaction.find({ hotel: hotelID });

        if (results.length === 0) {
            Hotel.findByIdAndRemove(hotelID)
                .then(() => {
                    console.log("DESTROYED HOTEL");
                    res.status(200).send("DESTROYED HOTEL");
                })
                .catch((err) => console.log(err));
        } else {
            return res.status(400).send("DESTROYED HOTEL ERROR");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getNewHotel = async (req, res) => {
    const hotelId = req.params.hotelId;

    const rooms = await Room.find().select("title _id");

    if (hotelId !== "newHotel") {
        const hotel = await Hotel.findById(hotelId);
        return res.status(200).send({ rooms, hotel });
    }

    return res.status(200).send({ rooms });
};

exports.postNewHotel = async (req, res) => {
    try {
        const { id } = req.body;
        delete req.body.id;
        const newHotel = { ...req.body };

        const hotelExists = await Hotel.findById(id);

        if (!hotelExists) {
            const hotel = new Hotel({ ...newHotel });

            await hotel.save();

            console.log("Created hotel successfully");
            return res.status(200).send("Created hotel successfully");
        }

        // updatedHotel
        await hotelExists.updateOne({ $set: { ...newHotel } });
        console.log("Updated hotel successfully");
        return res.status(200).send("Updated hotel successfully");
    } catch (error) {
        console.log(error);
    }
};

// Room
exports.getRooms = (req, res) => {
    Room.find()
        .then((rooms) => {
            res.status(200).send({ rooms });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDeleteRoom = async (req, res) => {
    try {
        const { roomID } = req.body;

        // const hotels = await Hotel.find({
        //     rooms: { $in: [roomID] },
        // }).select("_id");
        // const hotelArr = hotels.map((item) => item._id);

        const results = await Transaction.find({ "room.id": roomID });

        if (results.length === 0) {
            Room.findByIdAndRemove(roomID)
                .then(() => {
                    console.log("DESTROYED HOTEL");
                    return res.status(200).send("DESTROYED HOTEL");
                })
                .catch((err) => console.log(err));
        } else {
            return res.status(400).send("DESTROYED HOTEL ERROR");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.postNewRoom = async (req, res) => {
    try {
        const { hotelID, id } = req.body;
        const newRoom = { ...req.body };
        delete newRoom.hotelID;
        delete newRoom.id;

        const roomExists = await Room.findById(id);

        let room;
        console.log(roomExists);
        if (!roomExists) {
            room = new Room({ ...newRoom });

            await room.save();

            console.log("Created room successfully");
            return res.status(200).send("Created room successfully");
        }

        // Find a hotel by id and add a new room to the rooms array
        if (hotelID)
            await Hotel.findByIdAndUpdate(hotelID, {
                $push: { rooms: room._id },
            });
        console.log("Updated room successfully");
        return res.status(200).send("Updated room successfully");
    } catch (error) {
        console.log(error);
    }
};

exports.getNewRoom = async (req, res) => {
    const roomId = req.params.roomId;

    const hotels = await Hotel.find().select("title _id");

    if (roomId !== "newHotel") {
        const room = await Room.findById(roomId);
        return res.status(200).send({ hotels, room });
    }

    return res.status(200).send({ hotels });
};
