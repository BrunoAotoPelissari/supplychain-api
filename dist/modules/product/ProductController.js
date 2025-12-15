"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    constructor() {
        this.list = (req, res) => {
            return res.json({ message: "Lista de produtos" });
        };
        this.create = (req, res) => {
            const { name, price } = req.body;
            return res.status(201).json({
                message: "Produto criado com sucesso",
                data: { name, price },
            });
        };
    }
}
exports.ProductController = ProductController;
