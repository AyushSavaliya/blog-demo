const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const hotelSchema = mongoose.Schema({
    hotelOwner:{
        type:String,
        required:true
    },
    hotelEmail:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Email is not vaild");
            }
        }
    },
    hotalPassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

hotelSchema.methods.genretHotelToken = async function () {
    try {
      const token =  jwt.sign({ _id: this._id }, "hotelGenretToken");
      this.tokens = await this.tokens.concat({ token: token });
      await this.save();
      return token;
    } catch (error) {
      console.log(error.message);
    }
};
module.exports = mongoose.model("hotelOwner",hotelSchema);