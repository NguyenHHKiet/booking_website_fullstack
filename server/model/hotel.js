const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        title: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        distance: { type: String },
        photos: { type: [String] },
        desc: { type: String, required: true },
        rating: { type: Number, min: 0, max: 5 },
        featured: { type: Boolean, default: false },
        rooms: [
            {
                // type: Schema.Types.ObjectId,
                type: String,
                ref: "Room",
            },
        ],
        cheapestPrice: { type: Number },
    },
    {
        timestamps: true, // or { createdAt: true, updatedAt: true }
    }
);

module.exports = mongoose.model("Hotel", hotelSchema);
