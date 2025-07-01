import express from "express";
import { addData, getData, getDataById } from "../Controllers/wisataControllers.js";

const router = express.Router();

router.get("/wisata", getData);
router.get("/wisata/:id", getDataById);
router.post("/wisata", addData);

export default router;
