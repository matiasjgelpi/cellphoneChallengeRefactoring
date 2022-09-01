"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const uri = () => {
    if (process.env.MONGODB_URI !== undefined)
        return process.env.MONGODB_URI;
    else {
        throw new Error('Error connecting to database, wrong URI');
    }
};
const options = {
    dbName: 'phone_store_db'
};
const connectDb = () => {
    mongoose_1.default.connect(uri(), options).then(() => {
        console.log('Connected to database');
    }).catch(err => {
        console.log(err);
    });
};
exports.connectDb = connectDb;
