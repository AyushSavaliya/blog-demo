const express = require('express');
const router = express.Router();
const { createbooking, getAllUser, getUserFindById ,joinData} = require("../controller/bookingController");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Adharcard Image'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/booking/:id', upload.single('Adharcardimage'), createbooking);
router.get("/getAllUser", getAllUser);
router.get("/getuserFindByID/:id", getUserFindById);
router.get("/joindataBookingId/:_id",joinData);


module.exports = router;