import express from "express";
import { sequelize } from "./api/db"
import router from "./api/routes";

const { APP_PORT } = process.env

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
