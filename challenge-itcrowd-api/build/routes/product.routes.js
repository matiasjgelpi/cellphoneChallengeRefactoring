"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productServices_1 = __importDefault(require("../services/productServices"));
const verifyToken_1 = require("../utils/verifyToken");
const router = (0, express_1.Router)();
router.post('/product', verifyToken_1.verifyToken, productServices_1.default.postProduct);
router.get('/products', productServices_1.default.getAllProducts);
router.get('/product/:id', productServices_1.default.getProduct);
router.get('/products/:brandId', productServices_1.default.getProductsByBrand);
router.delete('/product/:id', verifyToken_1.verifyToken, productServices_1.default.deleteProduct);
router.put('/product/:id', verifyToken_1.verifyToken, productServices_1.default.updateProduct);
exports.default = router;
