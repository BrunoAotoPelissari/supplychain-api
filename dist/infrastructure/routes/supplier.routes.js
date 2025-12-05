"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const suppliers = [
    { id: "1", name: "Seara", contactEmail: "contato@seara.com" },
    { id: "2", name: "Mercado Livre", contactEmail: "suporte@mercadolivre.com" }
];
router.get("/", (req, res) => res.json(suppliers));
router.post("/", (req, res) => {
    const { name, contactEmail } = req.body;
    const newSupplier = { id: String(suppliers.length + 1), name, contactEmail };
    suppliers.push(newSupplier);
    res.status(201).json(newSupplier);
});
exports.default = router;
