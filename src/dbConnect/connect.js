const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hotelData").then(() => {
    console.log("connection is sucessful");
}).catch(() => {
    console.log("connection is not sucessful");
});