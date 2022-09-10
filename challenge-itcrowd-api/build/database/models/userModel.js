"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    isAdministrator: { type: Boolean, required: true }
});
userSchema.set('toJSON', {
    transform: (_doc, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
