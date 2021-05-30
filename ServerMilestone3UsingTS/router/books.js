"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
//import book from './book';
exports.router = express_1.default.Router();
const book_1 = __importDefault(require("../models/book"));
const userDetails_1 = require("./userDetails");
// import {Book} from './book';
//const expresss=require('express');
//const book = require('./book');
//const router=expresss.Router();
//const Book=require('./book')
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.find();
        res.json(books);
    }
    catch (err) {
        res.send("get request");
    }
}));
exports.router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findById(req.params.id);
        res.json(book);
    }
    catch (err) {
        res.send("get request");
    }
}));
exports.router.delete("/:id", userDetails_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findById(req.params.id);
        if (book) {
            const a1 = yield book.remove();
            res.send("Deleted");
        }
        else {
            res.status(404).send("Wrong Id");
        }
    }
    catch (err) {
        res.send("Error");
    }
}));
exports.router.post("/add", userDetails_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new book_1.default({
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        price: req.body.price,
        rating: req.body.rating,
        votes: req.body.votes,
        cover: req.body.cover,
        description: req.body.description,
    });
    try {
        const store = yield book.save();
        if (store) {
            res.status(201).json(store);
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (err) {
        res.send("error");
    }
}));
exports.router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findById(req.params.id);
        book.isbn = req.body.isbn;
        book.title = req.body.title;
        book.author = req.body.author;
        book.pages = req.body.pages;
        book.price = req.body.price;
        book.rating = req.body.rating;
        book.votes = req.body.votes;
        book.cover = req.body.cover;
        book.description = req.body.description;
        const a1 = yield book.save();
        res.json(a1);
    }
    catch (_a) {
        res.send("Error");
    }
}));
