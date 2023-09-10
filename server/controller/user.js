const Transaction = require("../model/transaction");
const Hotel = require("../model/hotel");
const User = require("../model/user");

exports.getTransition = (req, res, next) => {
    const { authentication } = req.headers;

    Transaction.find({ user: authentication })
        .populate([
            { path: "user", model: "User", select: "email fullName -_id" },
            { path: "hotel", model: "Hotel", select: "rooms name title -_id" },
        ])
        .then((result) => {
            res.status(200).send({ transition: result });
        })
        .catch((err) => {
            console.log(err);
        });
};
