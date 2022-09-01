"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBrand = exports.validateNewBrand = exports.validateUpdateProduct = exports.validateNewProduct = void 0;
const typeValidators_1 = require("./typeValidators");
const validateNewProduct = (object) => {
    const newProduct = {
        name: (0, typeValidators_1.parseStrings)(object.name, 'name', false),
        description: (0, typeValidators_1.parseStrings)(object.description, 'description', false),
        image_url: (0, typeValidators_1.parseStrings)(object.image_url, 'image_url', false),
        price: (0, typeValidators_1.parseNumbers)(object.price, 'price', false),
        brand: (0, typeValidators_1.parseIds)(object.brand, 'brand')
    };
    return newProduct;
};
exports.validateNewProduct = validateNewProduct;
const validateUpdateProduct = (object) => {
    const toUpdateProduct = {};
    if (object.name !== undefined)
        toUpdateProduct.name = (0, typeValidators_1.parseStrings)(object.name, 'name', true);
    if (object.description !== undefined)
        toUpdateProduct.description = (0, typeValidators_1.parseStrings)(object.description, 'description', true);
    if (object.image_url !== undefined)
        toUpdateProduct.image_url = (0, typeValidators_1.parseStrings)(object.image_url, 'image_url', true);
    if (object.price !== undefined)
        toUpdateProduct.price = (0, typeValidators_1.parseNumbers)(object.price, 'price', true);
    if (object.brand !== undefined)
        toUpdateProduct.brand = (0, typeValidators_1.parseIds)(object.brand, 'brand');
    return toUpdateProduct;
};
exports.validateUpdateProduct = validateUpdateProduct;
const validateNewBrand = (object) => {
    const newBrand = {
        name: (0, typeValidators_1.parseStrings)(object.name, 'name', false),
        logo_url: (0, typeValidators_1.parseStrings)(object.logo_url, 'logo_url', false)
    };
    return newBrand;
};
exports.validateNewBrand = validateNewBrand;
const validateUpdateBrand = (object) => {
    const toUpdateBrand = {};
    if (object.name !== undefined)
        toUpdateBrand.name = (0, typeValidators_1.parseStrings)(object.name, 'name', true);
    if (object.logo_url !== undefined)
        toUpdateBrand.logo_url = (0, typeValidators_1.parseStrings)(object.logo_url, 'logo_url', true);
    return toUpdateBrand;
};
exports.validateUpdateBrand = validateUpdateBrand;
