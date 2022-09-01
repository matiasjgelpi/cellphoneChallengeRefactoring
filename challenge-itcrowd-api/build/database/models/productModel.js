"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: mongoose_1.Schema.Types.ObjectId, ref: 'BrandModel' }
});
productSchema.set('toJSON', {
    transform: (_doc, returnedObject) => {
        var _a;
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        (_a = returnedObject === null || returnedObject === void 0 ? void 0 : returnedObject.brand) === null || _a === void 0 ? true : delete _a.id;
    }
});
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = ProductModel;
