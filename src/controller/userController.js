const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
exports.Signup = async (req, res, next) => {
    try {
        const { userName, userEmail, userPassword } = req.body;
        const user = new User({
            userName:userName,
            userEmail: userEmail,
            userPassword: userPassword, 
        })
        user.userPassword = await bcrypt.hash(user.userPassword , 10);
        const userRegister = await user.save();
        return res.status(200).send(userRegister);
        
    } catch (error) {
        return res.status(400).send(error.message);
    }
    next();
}

exports.Signin = async (req, res, next) => {
    try {
        const Email = req.body.userEmail;
        const Password = req.body.userPassword;
        const userLogin = await User.findOne({userEmail:Email});
        const isMatch = await bcrypt.compare(Password,userLogin.userPassword);
        if (isMatch) {
            const token = await userLogin.genretToken();
            return res.status(200).send(userLogin);
        } else {
            return res.status(400).send("password is not match");
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
    next();
}

exports.getFindAllUser = async(req,res) => {
        try {
            const userdata = await User.find();
            return res.status(200).send(userdata);
        } catch (error) {
            return res.status(400).send(error);
        }
}

exports.getUserFindById = async(req,res) => {
        try {
            const User_id = req.params.id;
            const findById = await User.findById(User_id);
            return res.status(200).send(findById);
        } catch (error) {
            return res.status(400).send(error);
        }
}

exports.updateUser = async(req,res) => {
        try {
            const User_id = req.params.id;
            const updateId = await User.findByIdAndUpdate(User_id,req.body, { new: true });
            return res.status(200).send(updateId);
        } catch (error) {
            return res.status(400).send(error);
        }
}

exports.deleteUser = async(req,res) => {
    try {
        const User_id = req.params.id;
        const deleteId = await User.findByIdAndDelete(User_id);
        return res.status(200).send(deleteId);
    } catch (error) {
        return res.status(400).send(error);
    }
}