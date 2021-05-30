import express from "express";
//import book from './book';
export const router = express.Router();
import Book from "../models/book";
import { authenticate } from "./userDetails";
// import {Book} from './book';
//const expresss=require('express');
//const book = require('./book');
//const router=expresss.Router();
//const Book=require('./book')

router.get("/", async (req: any, res: any) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.send("get request");
  }
});
router.get("/:id", async (req: any, res: any) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    res.send("get request");
  }
});

router.delete("/:id", authenticate, async (req: any, res: any) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      const a1 = await book.remove();
      res.send("Deleted");
    } else {
      res.status(404).send("Wrong Id");
    }
  } catch (err) {
    res.send("Error");
  }
});

router.post("/add", authenticate, async (req: any, res: any) => {
  const book: any = new Book({
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
    const store = await book.save();
    if (store) {
      res.status(201).json(store);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    res.send("error");
  }
});

router.put("/:id", async (req: any, res: any) => {
  try {
    const book = await Book.findById(req.params.id);
    book.isbn = req.body.isbn;
    book.title = req.body.title;
    book.author = req.body.author;
    book.pages = req.body.pages;
    book.price = req.body.price;
    book.rating = req.body.rating;
    book.votes = req.body.votes;
    book.cover = req.body.cover;
    book.description = req.body.description;
    const a1 = await book.save();
    res.json(a1);
  } catch {
    res.send("Error");
  }
});
