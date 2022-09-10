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
const productModel_1 = __importDefault(require("../database/models/productModel"));
const brandModel_1 = __importDefault(require("../database/models/brandModel"));
const parsers_1 = require("../utils/parsers");
const typeValidators_1 = require("../utils/typeValidators");
const getAllProducts = (_req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield productModel_1.default.find({}, 'name image_url price');
            return res.send(products);
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const getProduct = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            (0, typeValidators_1.parseIds)(id, 'id');
            const product = yield productModel_1.default.findById(id).populate({
                path: 'brand',
                model: brandModel_1.default
            });
            return res.send(product);
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const getProductsByBrand = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { brandId } = req.params;
            (0, typeValidators_1.parseIds)(brandId, 'brandId');
            const products = yield productModel_1.default.find({ brand: brandId }).populate({
                path: 'brand',
                model: brandModel_1.default
            });
            if (products.length === 0) {
                return res.status(400).send({ msg: 'No products with this brand found' });
            }
            return res.send(products);
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const postProduct = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const validatedRequestBody = (0, parsers_1.validateNewProduct)(req.body);
            const product = yield productModel_1.default.create(validatedRequestBody);
            return res.send(product);
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const deleteProduct = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            (0, typeValidators_1.parseIds)(id, 'id');
            const deletedProduct = yield productModel_1.default.deleteOne({ _id: id });
            return res.send({ msg: `${deletedProduct.deletedCount} document deleted` });
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const updateProduct = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            (0, typeValidators_1.parseIds)(id, 'id');
            const validatedRequestBody = (0, parsers_1.validateUpdateProduct)(req.body);
            const updatedProduct = yield productModel_1.default.findByIdAndUpdate(id, validatedRequestBody, { new: true });
            return res.send({ product_updated: updatedProduct });
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const productServices = {
    getAllProducts,
    getProductsByBrand,
    getProduct,
    postProduct,
    deleteProduct,
    updateProduct
};
exports.default = productServices;
