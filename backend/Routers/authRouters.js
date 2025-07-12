import express from "express";
import { login } from "../Controllers/authController";

const route = express.Router();

route.post("/login", login);

export default route;
