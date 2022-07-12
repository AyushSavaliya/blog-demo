const express = require("express");
const router = express.Router();
const { createRoom, getAllroom, getDataFindById ,updateRoomFindById,deleteRoomFindById} = require("../controller/roomsController");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../hotelImages'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage })
router.post("/createRooms/:id", upload.array("roomImages", 100), createRoom);
router.get("/getAllRooms", getAllroom);
router.get("/getDataFindById/:id", getDataFindById);
router.get("/updateRoomFindById/:id", upload.single("roomImages"), updateRoomFindById);
router.delete("/deleteDataFindById/:id", deleteRoomFindById);

module.exports = router;