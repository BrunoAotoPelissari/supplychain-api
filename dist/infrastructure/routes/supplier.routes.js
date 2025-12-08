"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SupplierController_1 = require("./SupplierController");
const router = (0, express_1.Router)();
const controller = new SupplierController_1.SupplierController();
router.get("/", controller.list);
router.post("/", controller.create);
exports.default = router;
