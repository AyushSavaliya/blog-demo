const mongoose = require("mongoose");
const validator = require("validator");
const bookingSchema = mongoose.Schema({
    hotel_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    Name:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:String,
        unique:true,
            validator: function (v) { 
              if (v === undefined) return true;
              return /^(?:(?:(?(?:0(?:0|11))?[\s-]?(?|+)\d{1,4})?[\s-]?(?:(?0)?[\s-]?)?)|(?:(?0))(?:(?:\d{5})?[\s-]?\d{4,5})|(?:\d{4})?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3})?[\s-]?\d{3}[\s-]?\d{3,6})|(?:\d{2})?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext.?|)\d{3,4})?$/.test(v);
            },
            message: 'Please enter a valid phone Number',
        required: [true, 'User phone number required']
    },
    Email:{
        type:String,
        unique:true,
        require:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    Address:{
        type:String,
        require:true
    },
    City:{
        type:String,
        require:true
    },
    State:{
        type:String,
        require:true
    },
    Adharcardimage:{
        type:String,
        require:true
    },
    RoomNumber:{
        type:Number,
        require:true
    },
    Payment:{
        type:Boolean,
        require:true
    }
});

module.exports = mongoose.model('booking',bookingSchema);