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
exports.authenticate = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
//import book from './book';
exports.userRouter = express_1.default.Router();
const userDetail_1 = __importDefault(require("../models/userDetail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import userSchema from "../model/userDetail";
// import {Book} from './book';
//const expresss=require('express');
//const book = require('./book');
//const router=expresss.Router();
//const Book=require('./book')
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.query.userName;
    const password = req.query.password;
    if (userName && password) {
        try {
            const userDetails = yield userDetail_1.default.findOne({
                email: userName,
                password: password,
            });
            if (userDetails) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        }
        catch (err) {
            res.send("get request");
        }
    }
}));
exports.userRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new userDetail_1.default({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // name: req.body.name,
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        try {
            const user = yield userDetail_1.default.findOne({
                email: email,
            });
            if (user) {
                const pass = yield userDetail_1.default.findOne({
                    password: password,
                });
                if (pass) {
                    // const user = { email: email, password: password };
                    // const token = jwt.sign(user, "abhishekpatil17");
                    otpGenerating(req, res);
                    res.status(200).json("logged-in");
                }
                else {
                    res.json("password is incorrect");
                }
            }
            else {
                res.status(401).json("Invalid");
            }
        }
        catch (err) {
            res.send("error");
        }
    }
}));
function otpGenerating(req, res) {
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
        .then((message) => __awaiter(this, void 0, void 0, function* () {
        const time = 2 * 60 * 1000;
        console.log(time);
        const expires = Date.now() + time;
        console.log(Date.now());
        console.log(expires);
        yield userDetail_1.default.updateOne({ email: req.body.email }, { $set: { otp: otp, time: expires } });
        console.log(otp);
    }))
        .catch((err) => {
        console.log(err);
    });
}
function authenticate(req, res, next) {
    const header = req.header("Authorization");
    const token = header && header.split(" ")[1];
    //console.log(token);
    if (token == null) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, "abhishekpatil17", (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
exports.authenticate = authenticate;
