import express from "express";
import { addData, getData, getDataById } from "../Controllers/kulinerController.js";

const router = express.Router();

router.get("/kuliner", getData);
router.get("/kuliner/:id", getDataById);
router.post("/kuliner", addData);

export default router;
