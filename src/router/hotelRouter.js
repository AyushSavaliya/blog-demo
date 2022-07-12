const express = require("express");
const router = express.Router();

const { hotelSignup, hotelSignin, getFindAllHotelOwner, getHotelOwnerFindById, updateHotelOwner, deleteHotelOwner } = require("../controller/hotelController");

router.post("/hotelSignup", hotelSignup);
router.post("/hotelSignin", hotelSignin);
router.get("/findOwner", getFindAllHotelOwner);
router.get("/findOwnerById/:id", getHotelOwnerFindById);
router.post("/updatefindOwnerById/:id", updateHotelOwner);
router.delete("/deletefindOwnerById/:id", deleteHotelOwner);

module.exports = router;