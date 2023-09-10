const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 100,
        },
        fullName: { type: String },
        phoneNumber: { type: String },
        email: {
            type: String,
            required: [true, "Email user required"],
            unique: true,
        },
        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true, // or { createdAt: true, updatedAt: true }
    }
);

module.exports = mongoose.model("User", userSchema);
