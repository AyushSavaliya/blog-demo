const ObjectId = require('mongodb').ObjectID;
const hotels = require("../Model/hotelsModel");
const hotel = require("../Model/hotelModel");
const createHotels = async (req, res) => {
    try {
        const hotelOwner_id = req.params.id;
        const { hotelName, hotelAddress, contactPersonName, contactNumber } = req.body;
        const createHotel = new hotels({
            hotelOwner_id: hotelOwner_id,
            hotelName: hotelName,
            hotelAddress: hotelAddress,
            contactPersonName: contactPersonName,
            contactNumber: contactNumber,
        });
        const response = await createHotel.save();
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getAllHotels = async (req, res) => {
    try {
        const findData = await hotels.find();
        return res.status(200).send(findData);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const ownerByHotels = async (req, res) => {
    // owner by create hotels
    try {
        const _id = req.params.id;
        const hotelOwner = await hotel.aggregate([
            {
                '$lookup': {
                    'from': 'hotels',
                    'localField': '_id',
                    'foreignField': 'hotelOwner_id',
                    'as': 'hoteldetails'
                }
            }, {
                '$match': {
                    '_id': ObjectId(_id)
                }
            }
        ]);
        return res.status(200).send(hotelOwner)
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = { createHotels, getAllHotels, ownerByHotels };