import express from "express"
import { addData, getData, getDataById} from "../Controllers/hotelControllers.js"


const router = express.Router()


router.get("/hotel",getData)
router.get("/hotel/:id", getDataById)
router.post("/hotel", addData);


export default router;