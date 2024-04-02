import express from "express";
import mongoose from 'mongoose';

import router from "./api/routes";

const { DB_APP_NAME, DB_APP_USER, DB_APP_PASSWORD, DB_SERVER, DB_PORT, APP_PORT } = process.env
const DB_URI = `mongodb://${DB_APP_USER}:${DB_APP_PASSWORD}@${DB_SERVER}:${DB_PORT}/${DB_APP_NAME}`
console.log(DB_URI)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(APP_PORT || 3000, () => {
  console.log(`Server is running on port ${APP_PORT || 3000}`);

  mongoose.connect(DB_URI).then(() => {
    console.log("Succesfully connected to MongoDB");
  }).catch((error: Error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });
});
