"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../../modules/product/ProductController");
const router = (0, express_1.Router)();
const controller = new ProductController_1.ProductController();
router.get("/", controller.list);
router.post("/", controller.create);
exports.default = router;
