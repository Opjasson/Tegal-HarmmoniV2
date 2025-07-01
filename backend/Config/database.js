import { Sequelize } from "sequelize";

const db = new Sequelize("tegalHarmoni", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;
