const User = require("../model/user");
const emailRegex = require("../util/validate");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    if (email.match(emailRegex)) {
        console.log("Valid email");
    } else {
        console.log("Invalid email");
        return;
    }

    try {
        const userExisting = await User.findOne({ email: email });

        if (userExisting) {
            return res.status(201).send({ message: "Account had been exist" });
        }

        const hash = bcrypt.hashSync(password, salt);
        const user = new User({ email, password: hash });

        await user.save();

        console.log("Created user successfully");
        return res.status(200).send("Created user successfully");
    } catch (error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (email.match(emailRegex)) {
        console.log("Valid email");
    } else {
        console.log("Invalid email");
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                console.log("Password matched", {
                    message: "Login successful",
                });
                return res.status(200).send(user);
            } else {
                console.log("Password not matched");
                return res.status(400).send({ message: "Invalid password" });
            }
        });
    } catch (error) {
        console.log(error);
    }
};
