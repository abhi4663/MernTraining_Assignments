"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
//const mongoosee=require('mongoose');
const bookSchema = new mongoose_1.default.Schema({
    isbn: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    pages: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    rating: {
        type: String,
        require: true,
    },
    votes: {
        type: String,
        require: true,
    },
    cover: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
});
module.exports = mongoose_1.default.model("books", bookSchema);
