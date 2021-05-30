import express, { request } from "express";
//import book from './book';
export const userRouter = express.Router();
import UserDetail from "../models/userDetail";
import jwt from "jsonwebtoken";
//import userSchema from "../model/userDetail";

// import {Book} from './book';
//const expresss=require('express');
//const book = require('./book');
//const router=expresss.Router();
//const Book=require('./book')

userRouter.get("/", async (req: any, res: any) => {
  const userName = req.query.userName;
  const password = req.query.password;
  if (userName && password) {
    try {
      const userDetails = await UserDetail.findOne({
        email: userName,
        password: password,
      });
      if (userDetails) {
        res.json(true);
      } else {
        res.json(false);
      }
    } catch (err) {
      res.send("get request");
    }
  }
});

userRouter.post("/add", async (req: any, res: any) => {
  const book: any = new UserDetail({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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
userRouter.post("/login", async (req: any, res: any) => {
  // name: req.body.name,
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    try {
      const user = await UserDetail.findOne({
        email: email,
      });
      if (user) {
        const pass = await UserDetail.findOne({
          password: password,
        });
        if (pass) {
          // const user = { email: email, password: password };
          // const token = jwt.sign(user, "abhishekpatil17");
          otpGenerating(req, res);
          res.status(200).json("logged-in");
        } else {
          res.json("password is incorrect");
        }
      } else {
        res.status(401).json("Invalid");
      }
    } catch (err) {
      res.send("error");
    }
  }
});
function otpGenerating(req: any, res: any) {
  const accountSID = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = require("twilio")(accountSID, authToken);
  let otp = "";
  for (let i = 1; i <= 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  client.messages
    .create({
      from: "+16162130801",
      to: "+917348902042",
      body: `OTP:${otp} for log in`,
    })
    .then(async (message: any) => {
      const time = 2 * 60 * 1000;
      console.log(time);
      const expires = Date.now() + time;
      console.log(Date.now());
      console.log(expires);
      await UserDetail.updateOne(
        { email: req.body.email },
        { $set: { otp: otp, time: expires } }
      );
      console.log(otp);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
export function authenticate(req: any, res: any, next: any) {
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];
  //console.log(token);
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, "abhishekpatil17", (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
