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
require("dotenv/config");
const userModel_1 = __importDefault(require("../database/models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const secret = process.env.SECRET_KEY
const postUser = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, isAdministrator } = req.body;
            let user = yield userModel_1.default.findOne({ email: email });
            if (user === null) {
                const newUser = {
                    name,
                    email,
                    isAdministrator
                };
                user = yield userModel_1.default.create(newUser);
            }
            const token = jsonwebtoken_1.default.sign({ name: user.name, email: user.email, isAdministrator: user.isAdministrator }, 'secret3', { expiresIn: '8h' });
            return res.send({ user, token });
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const userServices = {
    postUser
};
exports.default = userServices;
