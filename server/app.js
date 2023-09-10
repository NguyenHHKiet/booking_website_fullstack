const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const bodyParser = require("body-parser");

// import routes from
const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotel");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/user", userRoutes);

app.use("/api/admin", adminRoutes);

// connect
const uri =
    "mongodb+srv://nhoangkiet35:2mif8aQalNaAfz0K@cluster0.yq5iral.mongodb.net/books?retryWrites=true&w=majority";

mongoose
    .connect(uri)
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => console.log(err));
