import mongoose from "mongoose";

//const mongoosee=require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: false,
  },
  time: {
    type: String,
    require: false,
  },
});

export = mongoose.model("userdetails", userSchema);
