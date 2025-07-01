import express from "express";
import { createVoucher, getAllVouchers } from "../Controllers/codeVoucher.js";

const route = express.Router();

route.post("/voucher", createVoucher);
route.get("/voucher", getAllVouchers);

export default route;
