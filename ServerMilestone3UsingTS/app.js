"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const books_1 = require("./router/books");
const userDetails_1 = require("./router/userDetails");
const cors_1 = __importDefault(require("cors"));
dotenv.config(); //ENV CONFIGURATION
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/books", books_1.router);
app.use("/userdetails", userDetails_1.userRouter);
const url = "mongodb://localhost/booking";
//const url="mongodb+srv://Abhishek_Mern:Abhishek_Mern@mern.js49d.mongodb.net/BMS_Mern?retryWrites=true&w=majority"
mongoose_1.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connect = mongoose_1.default.connection;
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server Created on Port", port);
});
connect.on("open", function () {
    console.log("Connected.....");
});
