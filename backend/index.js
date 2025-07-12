import express from "express";
import dotenv from "dotenv";
import voucher from "./Model/codeVoucher.js";
import hotelRouters from "./Routers/hotelRouters.js";
import wisataRouters from "./Routers/wisataRouters.js";
import kulinerRouters from "./Routers/kulinerRouter.js";
import voucherRouters from "./Routers/codeVoucher.js";
import userRouters from "./Routers/userRouters.js"
import authRouters from "./Routers/authRouters.js"
import Users from "./Model/userModel.js";
import cors from "cors";

dotenv.config();
const app = express();

// migrate db otomatis
// (async () => {
//     await Users.sync();
// })();

app.use(cors());
app.use(express.json());
app.use(hotelRouters);
app.use(wisataRouters);
app.use(kulinerRouters);
app.use(voucherRouters);
app.use(userRouters);
app.use(authRouters);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
