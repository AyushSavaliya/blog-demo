const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require("./dbConnect/connect");
app.use(express.json());

const userRouter = require("./router/userRouter");
const hotelRouter = require("./router/hotelRouter");
const hotelsRouter = require("./router/hotelsRouter");
const roomsRouter = require("./router/roomsRouter");
const bookingRouter = require("./router/bookingRouter");
app.use(userRouter);
app.use(hotelRouter);
app.use(hotelsRouter);
app.use(roomsRouter);
app.use(bookingRouter);
app.listen(port,() =>{
    console.log("this site port number ",port);
});