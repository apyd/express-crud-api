import express from "express";
import { Sequelize } from "sequelize";

import router from "./api/routes";

const { DB_APP_NAME, DB_APP_USER, DB_APP_PASSWORD, DB_SERVER, DB_PORT, APP_PORT } = process.env
export const sequelize = new Sequelize({
  dialect: "postgres",
  database: DB_APP_NAME,
  username: DB_APP_USER,
  password: DB_APP_PASSWORD,
  host: DB_SERVER,
  port: Number(DB_PORT),
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(APP_PORT || 3000, async () => {
  console.log(`Server is running on port ${APP_PORT || 3000}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
