import express from "express";
import { addData, deleteKulinerById, getData, getDataById, updateKulinerById } from "../Controllers/kulinerController.js";

const router = express.Router();

router.get("/kuliner", getData);
router.get("/kuliner/:id", getDataById);
router.post("/kuliner", addData);
router.patch("/kuliner/:id", updateKulinerById);
router.delete("/kuliner/:id", deleteKulinerById);

export default router;
