const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
        hotel_id:{
            type:mongoose.Schema.Types.ObjectId,
        },
        roomNumber:{
            type:Number,
            require:true,
            min:1,
            max:500
        },
        roomImages:[{
            type:String,
            require:true
        }],
        includedFood:{
            type:Boolean,
            require:true
        },
        Price:{
            type:Number,
            require:true,
            min:700,
            max:10000
           
        },
        Ac:{
            type:Boolean,
            require:true
        },
        Available:{
            type:Boolean,
            require:true
        }
});


module.exports = mongoose.model('room',roomSchema);