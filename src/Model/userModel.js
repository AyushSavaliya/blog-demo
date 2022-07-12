const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    userPassword:{
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

userSchema.methods.genretToken = async function () {
    try {
      const token =  jwt.sign({ _id: this._id }, "userGenretToken");
      this.tokens = await this.tokens.concat({ token: token });
      await this.save();
      return token;
    } catch (error) {
      console.log(error.message);
    }
};
module.exports = mongoose.model("user",userSchema);