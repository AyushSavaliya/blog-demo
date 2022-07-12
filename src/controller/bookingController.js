const Booking = require("../Model/bookingModel");
const Hotel = require("../Model/hotelsModel");
const ObjectId = require('mongodb').ObjectID;

const createbooking = async (req, res) => {
    try {
        const hotel_id = req.params.id;
        const { Name, mobileNumber, Email, Address, City, State, Adharcardimage, RoomNumber, Payment } = req.body;
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
        const booking = new Booking({
            hotel_id: hotel_id,
            Name: Name,
            mobileNumber: mobileNumber,
            Email: Email,
            Address: Address,
            City: City,
            State: State,
            Adharcardimage: url,
            RoomNumber: RoomNumber,
            Payment: Payment
        });
        const response = await booking.save();
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getAllUser = async (req, res) => {
    try {
        const findData = await Booking.find();
        return res.status(200).send(findData);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getUserFindById = async (req, res) => {
    try {
        const user_id = req.params.id;
        const findByIdData = await Booking.findById(user_id);
        return res.status(200).send(findByIdData);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const joinData = async (req,res) => {
        try {
            const _id  = req.params.id;
            const userData = await Hotel.aggregate([
                {
                    '$lookup': {
                        'from': 'bookings',
                        'localField': '_id',
                        'foreignField': 'hotel_id',
                        'as': 'booking'
                    }
                },{
                    '$match': {
                        '_id': ObjectId(_id)
                    }
                }
            ]);
            console.log(userData);
            // const blog = await Booking.findOne({ hotel_id:  })
            return res.status(200).send(userData);
        } catch (error) {
            return res.status(400).send(error.message);
        }
}
module.exports = { createbooking, getAllUser, getUserFindById ,joinData}