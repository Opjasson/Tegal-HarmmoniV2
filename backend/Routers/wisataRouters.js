import express from "express";
import { addData, deleteWisataById, getData, getDataById, updateWisataById } from "../Controllers/wisataControllers.js";

const router = express.Router();

router.get("/wisata", getData);
router.get("/wisata/:id", getDataById);
router.post("/wisata", addData);
router.patch("/wisata/:id", updateWisataById);
router.delete("/wisata/:id", deleteWisataById);

export default router;
