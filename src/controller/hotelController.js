const Hotel = require("../Model/hotelModel");
const bcrypt = require("bcryptjs");

const hotelSignup = async (req, res) => {
    try {
        const { hotelOwner, hotelEmail, hotalPassword } = req.body;
        const hotel = new Hotel({
            hotelOwner: hotelOwner,
            hotelEmail: hotelEmail,
            hotalPassword: hotalPassword,
        });
        hotel.hotalPassword = await bcrypt.hash(hotel.hotalPassword, 10);
        const response = await hotel.save();
        return res.status(200).send(response);

    } catch (error) {
        return res.status(400).send(error);
    }
}

const hotelSignin = async (req, res) => {
    try {
        const Email = req.body.hotelEmail;
        const Password = req.body.hotalPassword;
        const hotelLogin = await Hotel.findOne({ hotelEmail: Email });
        const isMatch = await bcrypt.compare(Password, hotelLogin.hotalPassword);
        if (isMatch) {
            const token = await hotelLogin.genretHotelToken();
            return res.status(200).send(hotelLogin);
        } else {
            return res.status(400).send("password is not match");
        }
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getFindAllHotelOwner = async (req, res) => {
    try {
        const hotelOwnerdata = await Hotel.find();
        return res.status(200).send(hotelOwnerdata);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getHotelOwnerFindById = async (req, res) => {
    try {
        const Owner_id = req.params.id;
        console.log();
        const findById = await Hotel.findById(Owner_id);
        return res.status(200).send(findById);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const updateHotelOwner = async (req, res) => {
    try {
        const Owner_id = req.params.id;
        const updateId = await Hotel.findByIdAndUpdate(Owner_id, req.body, { new: true });
        return res.status(200).send(updateId);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const deleteHotelOwner = async (req, res) => {
    try {
        const Owner_id = req.params.id;
        const deleteId = await Hotel.findByIdAndDelete(Owner_id);
        return res.status(200).send(deleteId);
    } catch (error) {
        return res.status(400).send(error);
    }
}
module.exports = { hotelSignup, hotelSignin, getFindAllHotelOwner, getHotelOwnerFindById, updateHotelOwner, deleteHotelOwner };