"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader !== undefined ? authHeader.split(' ')[1] : null;
    if (token === null) {
        return res.status(401).send('Token requerido');
    }
    jsonwebtoken_1.default.verify(token, 'secret3', (err, user) => {
        console.log(err);
        if (err !== null)
            return res.status(403).send('Token invalido');
        console.log(err);
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
