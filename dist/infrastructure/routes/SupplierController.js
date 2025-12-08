"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
class SupplierController {
    constructor() {
        this.list = (req, res) => {
            res.json([{ message: "Listando fornecedores" }]);
        };
        this.create = (req, res) => {
            const { name, contactEmail } = req.body;
            res.status(201).json({ id: "1", name, contactEmail });
        };
    }
}
exports.SupplierController = SupplierController;
