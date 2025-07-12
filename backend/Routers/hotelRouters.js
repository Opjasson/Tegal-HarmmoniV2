import express from "express"
import { addData, getData, getDataById, updateHotelById} from "../Controllers/hotelControllers.js"


const router = express.Router()


router.get("/hotel",getData)
router.get("/hotel/:id", getDataById)
router.post("/hotel", addData);
router.patch("/hotel/:id", updateHotelById);


export default router;