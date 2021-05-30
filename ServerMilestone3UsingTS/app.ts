import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { router } from "./router/books";
import { userRouter } from "./router/userDetails";
import cors from "cors";

dotenv.config(); //ENV CONFIGURATION
const app = express();
app.use(express.json());
app.use(cors());
app.use("/books", router);
app.use("/userdetails", userRouter);
const url = "mongodb://localhost/booking";
//const url="mongodb+srv://Abhishek_Mern:Abhishek_Mern@mern.js49d.mongodb.net/BMS_Mern?retryWrites=true&w=majority"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = mongoose.connection;

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server Created on Port", port);
});

connect.on("open", function () {
  console.log("Connected.....");
});
