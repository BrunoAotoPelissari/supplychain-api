"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./infrastructure/express/app.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app_js_1.default.listen(PORT, () => {
    console.log(`🚀 LogisticsHub API rodando em http://localhost:${PORT}`);
    console.log(`📘 Documentação: http://localhost:${PORT}/api-docs`);
});
