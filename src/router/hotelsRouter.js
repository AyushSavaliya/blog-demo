const express = require("express");
const router = express.Router();

const { createHotels, getAllHotels, ownerByHotels } = require("../controller/hotelsController");

router.post('/createHotels/:id', createHotels);
router.get("/findAllData", getAllHotels);
router.get("/hotelOwnerdata/:id", ownerByHotels);


module.exports = router;