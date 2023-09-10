const fs = require("fs");
const p = require("../util/path");

const Hotel = require("../model/hotel");
const Room = require("../model/room");
const User = require("../model/user");
const Transaction = require("../model/transaction");

const images = {
    "Ho Chi Minh": "./images/HCM.webp",
    "Da Nang": "./images/Da Nang.webp",
    "Ha Noi": "./images/Ha Noi.webp",
};

exports.getHotels = (req, res) => {
    Hotel.find()
        .then((hotels) => {
            const qty = (type, city) =>
                hotels.filter((item) => item[type] === city).length;

            // cities
            let cities = [];
            for (const key in images) {
                if (Object.hasOwnProperty.call(images, key)) {
                    cities.push({
                        name: key,
                        qty: qty("city", key),
                        image: images[key],
                    });
                }
            }
            cities.sort((a, b) => b.qty - a.qty);

            // types
            const data = fs.readFileSync(p("type.json"), "utf8");
            const file = JSON.parse(data);
            const types = file.map((item) => {
                let count = 0;
                hotels.forEach((i) => {
                    if (item.name.toLowerCase().includes(i.type)) {
                        count = count + 1;
                    }
                });
                return {
                    name: item.name,
                    count: count,
                    image: item.image,
                };
            });

            // list hotel
            const hotelList = hotels.map((item) => {
                return {
                    id: item._id,
                    name: item.name,
                    city: item.city,
                    price: item.cheapestPrice,
                    rate: item.rating,
                    image_url: item.photos[0],
                };
            });
            hotelList.sort((a, b) => b.rate - a.rate).length = 3;

            return { cities, types, hotelList };
        })
        .then(({ cities, types, hotelList }) => {
            res.status(200).send({ cities, types, hotelList });
        })
        .catch((err) => console.log(err));
};

exports.postHotels = async (req, res) => {
    try {
        const { destination, dates, options } = { ...req.body };

        if (destination.trim() === "") {
            return res.status(400).send("Invalid destination");
        }

        Hotel.find({ city: destination })
            .populate({
                path: "rooms",
                model: "Room",
                match: { maxPeople: { $lte: options.adult } },
            })
            .then((hotels) => {
                const rooms = [];

                hotels.forEach((item) => {
                    rooms.push(...item.rooms);
                });

                res.status(200).send({ hotels, rooms });
            })
            .catch(function (err) {
                console.log(err);
            });

        // const hotels = await Hotel.find();
        // const filteredDestination = hotels.filter((hotel) => {
        //     const cityTrf = hotel.city.toLowerCase().replace(/\s+/g, "");
        //     const destinationTrf = destination
        //         .toLowerCase()
        //         .replace(/\s+/g, "");
        //     return cityTrf.includes(destinationTrf);
        // });

        // filteredDestination.forEach(async (item) => {
        //     const rooms = await Room.find({
        //         $and: [
        //             { _id: { $in: item.rooms } },
        //             { maxPeople: { $lt: options.adult } },
        //         ],
        //     });
        //     await res.status(200).send({ hotels: filteredDestination, rooms });
        // });
    } catch (error) {
        console.log(error);
    }
};

exports.getHotel = (req, res) => {
    const hotelID = req.params.hotelID;
    Hotel.findById(hotelID)
        .populate({
            path: "rooms",
            model: "Room",
        })
        .then((hotel) => {
            res.status(200).send(hotel);
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.booking = async (req, res) => {
    try {
        const {
            email,
            username,
            phone,
            cardNumber,
            totalBill,
            selectedRooms,
            dates,
            payment,
            hotel,
        } = req.body;
        if (!email) return;

        // Using findOneAndUpdate
        const user = await User.findOneAndUpdate(
            { email: email },
            { fullName: username, phoneNumber: phone }
        );

        const transaction = new Transaction({
            user: user._id,
            hotel: hotel,
            room: selectedRooms,
            dateStart: dates[0].startDate,
            dateEnd: dates[0].endDate,
            price: totalBill,
            payment: payment,
            status: "Check-in",
        });

        await transaction.save();

        console.log("Transaction saved");
        return res.status(200);
    } catch (error) {
        console.log(error);
    }
};

exports.getBookedRoom = (req, res) => {
    const hotelId = req.params.hotelId;
    Transaction.find({ hotel: hotelId })
        .then((results) => {
            const merged = results.map((item) => {
                const room = item.room.map(({ room }) => room);
                return room;
            });

            const roomNumbers = merged.concat.apply([], merged);
            // const roomNumbers = merged.flat(); // simple case

            res.status(200).send({ roomNumbers });
        })
        .catch((err) => {
            console.log(err);
        });
};
