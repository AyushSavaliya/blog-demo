const Room = require("../Model/roomsModel");
const ObjectId = require('mongodb').ObjectID;
const createRoom = async (req, res) => {
    var url = [];
    try {
        if (req.files) {
            var fs = require('fs');
            // function to encode file data to base64 encoded string
            function base64_encode(file) {
                // read binary data
                var bitmap = fs.readFileSync(file);
                // convert binary data to base64 encoded string
                return new Buffer(bitmap).toString('base64');
            }

            for (const key in req.files) {
                // base64 string
                var base64Str = base64_encode(req.files[key].path)

                // image url
                url.push(`data:${req.files[key].mimetype};base64,${base64Str}`)
            }
        }
        const hotel_id = req.params.id;
        const { roomNumber, includedFood, Price, Ac, Available } = req.body;
        const roomsData = new Room({
            hotel_id: hotel_id,
            roomNumber: roomNumber,
            roomImages: url,
            includedFood: includedFood,
            Price: Price,
            Ac: Ac,
            Available: Available
        });
        const data = await roomsData.save();
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getAllroom = async (req, res) => {
    try {
        const findData = await Room.find();
        return res.status(200).send(findData);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getDataFindById = async (req, res) => {
    try {
        const _id = req.params.id;
        const findById = await Room.findById(_id);
        return res.status(200).send(findById);
    } catch (error) {
        return res.status(40).send(error);
    }
}

const updateRoomFindById = async (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    try {
        if (req.file) {
            var fs = require('fs');
            // function to encode file data to base64 encoded string
            function base64_encode(file) {
                // read binary data
                var bitmap = fs.readFileSync(file);
                // convert binary data to base64 encoded string
                return new Buffer(bitmap).toString('base64');
            }
            // base64 string
            var base64Str = base64_encode(req.file.path)

            // image url
            var url = `data:${req.file.mimetype};base64,${base64Str}`
        }

        const { roomNumber, includedFood, Price, Ac, Available } = req.body;
        const updateById = await Room.findByIdAndUpdate(_id, {
            roomNumber: roomNumber,
            roomImages: url,
            includedFood: includedFood,
            Price: Price,
            Ac: Ac,
            Available: Available
        }, { new: true });
        return res.status(200).send(updateById);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}
const deleteRoomFindById = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteById = await Room.findByIdAndDelete(_id);
        return res.status(200).send(deleteById);
    } catch (error) {
        return res.status(400).send(error);
    }
}
module.exports = { createRoom, getAllroom, getDataFindById, updateRoomFindById,deleteRoomFindById };