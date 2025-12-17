"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const supplier_routes_js_1 = __importDefault(require("../routes/supplier.routes.js"));
const product_routes_1 = __importDefault(require("../routes/product.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger Docs
const swaggerPath = path_1.default.resolve(__dirname, "../../docs/swagger/swagger.yaml");
const swaggerDocument = yamljs_1.default.load(swaggerPath);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Routes
app.use("/suppliers", supplier_routes_js_1.default);
app.use("/products", product_routes_1.default);
exports.default = app;
