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
const brandModel_1 = __importDefault(require("../database/models/brandModel"));
const typeValidators_1 = require("../utils/typeValidators");
const parsers_1 = require("../utils/parsers");
const getAllBrands = (_req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const brands = yield brandModel_1.default.find({});
            return res.json(brands);
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const getBrand = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            (0, typeValidators_1.parseIds)(id, 'id');
            const brand = yield brandModel_1.default.findById(id);
            return res.send(brand);
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const postBrand = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const validatedRequestBody = (0, parsers_1.validateNewBrand)(req.body);
            const brand = yield brandModel_1.default.create(validatedRequestBody);
            return res.send(brand);
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const deleteBrand = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            (0, typeValidators_1.parseIds)(id, 'id');
            const deletedBrand = yield brandModel_1.default.deleteOne({ _id: id });
            return res.send({ msg: `${deletedBrand.deletedCount} document deleted` });
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const updateBrand = (req, res) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            (0, typeValidators_1.parseIds)(id, 'id');
            const validatedRequestBody = (0, parsers_1.validateUpdateBrand)(req.body);
            const updatedBrand = yield brandModel_1.default.findByIdAndUpdate(id, validatedRequestBody, {
                new: true
            });
            return res.send({ brand_updated: updatedBrand });
        }
        catch (error) {
            return res.status(400).send({ msg: error.toString() });
        }
    }))();
};
const brandServices = {
    getAllBrands,
    getBrand,
    postBrand,
    deleteBrand,
    updateBrand
};
exports.default = brandServices;
