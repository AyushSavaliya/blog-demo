const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

const verifyToken = async(req,res,next) => {
        try {
            const token = req.headers.token;
            const verifyUser = jwt.verify(token,"userGenretToken");
            const rootAuther = await User.findOne({_id:verifyUser._id,"token":token});
            if(!rootAuther){
                throw new Error('user not found')
            }
    
            req.token = token;
            req.rootAuther = rootAuther; 
            next();
        } catch (error) {
            return res.status(401).send(error);
        }
}

module.exports = verifyToken