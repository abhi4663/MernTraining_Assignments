"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
//const mongoosee=require('mongoose');
const userSchema = new mongoose_1.default.Schema({
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
module.exports = mongoose_1.default.model("userdetails", userSchema);
