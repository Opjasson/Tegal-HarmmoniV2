import express from "express";
import { createUser, deleteAkun, getUserById, getUsers, updateUsersById } from "../Controllers/userControllers.js";


const router = express.Router();

router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUsersById);
router.post("/user", createUser);
router.delete("/user/:id", deleteAkun);

export default router;
