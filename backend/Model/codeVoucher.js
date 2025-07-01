import { STRING } from "sequelize";
import db from "../Config/database.js";

const codeVoucher = db.define(
    "code_Voucher",
    {
        code: {
            type: STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        freezeTableName: true,
    }
);

export default codeVoucher;
