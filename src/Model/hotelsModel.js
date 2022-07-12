const mongoose = require('mongoose');

const hotelsSchema = mongoose.Schema({
    hotelOwner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotelowners',
    },
    hotelName: {
        type: String,
        require: true
    },
    hotelAddress: {
        type: String,
        require: true
    },
    contactPersonName: {
        type: String,
        require: true
    },
    contactNumber: {
        type: String,
        require: true,
        unique: true
    },
});

module.exports = mongoose.model('hotel', hotelsSchema);