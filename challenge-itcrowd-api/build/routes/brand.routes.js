"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brandServices_1 = __importDefault(require("../services/brandServices"));
const verifyToken_1 = require("../utils/verifyToken");
const router = (0, express_1.Router)();
router.post('/brand', verifyToken_1.verifyToken, brandServices_1.default.postBrand);
router.get('/brands', brandServices_1.default.getAllBrands);
router.get('/brand/:id', brandServices_1.default.getBrand);
router.delete('/brand/:id', verifyToken_1.verifyToken, brandServices_1.default.deleteBrand);
router.put('/brand/:id', verifyToken_1.verifyToken, brandServices_1.default.updateBrand);
exports.default = router;
