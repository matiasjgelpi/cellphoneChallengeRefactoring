"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./database/dbConnection");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// import { verifyToken } from './utils/verifyToken'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');
const corsOptions = {
    origin: ['https://www.thunderclient.io', 'http://localhost:3000']
};
(0, dbConnection_1.connectDb)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors(corsOptions));
app.use('/', product_routes_1.default);
app.use('/', brand_routes_1.default);
app.use('/', user_routes_1.default);
app.use('/', (_, res) => {
    return res.status(404).send({ msg: 'resource not found' });
});
const host = ((process.env.HOST !== undefined) && process.env.HOST) || 'localhost';
const port = (process.env.PORT !== undefined &&
    parseInt(process.env.PORT)) ||
    4000;
app.listen(port, host, () => {
    console.log(`Server started on port ${port}`);
});
