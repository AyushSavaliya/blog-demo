const express = require("express");
const router = express.Router();

const { Signup, Signin, getFindAllUser, getUserFindById, updateUser,deleteUser } = require("../controller/userController");
const Auth = require("../middalver/auth");

// router.post("/Signup", Signup);
router.post("/Signin", Signin);
router.get("/find", getFindAllUser);
router.get("/findById/:id", getUserFindById);
router.post("/updatefindById/:id", updateUser);
router.delete("/deletefindById/:id", deleteUser);

router.route("/").get(getFindAllUser).post(Signup)
// router.route("/:id").get(displ).patch(creste).delete();

module.exports = router;