"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIds = exports.parseNumbers = exports.parseStrings = void 0;
const mongoose_1 = require("mongoose");
const isString = (value) => typeof value === 'string';
const isNumber = (value) => typeof value === 'number';
const parseStrings = (value, name, edit) => {
    if (!isString(value))
        throw new TypeError(`${name} must be a string`);
    if (value.length === 0 && !edit)
        throw new TypeError(`${name} must not be empty`);
    return value;
};
exports.parseStrings = parseStrings;
const parseNumbers = (value, name, edit) => {
    if (!isNumber(value))
        throw new TypeError(`${name} must be a number`);
    if (value.length === 0 && !edit)
        throw new TypeError(`${name} must not be empty`);
    return value;
};
exports.parseNumbers = parseNumbers;
const parseIds = (id, name) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new TypeError(`${name} must be a valid ObjectId type`);
    if (id.length === 0)
        throw new TypeError(`${name} must not be empty`);
    return id;
};
exports.parseIds = parseIds;
