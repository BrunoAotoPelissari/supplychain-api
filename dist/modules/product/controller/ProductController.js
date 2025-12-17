"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../service/ProductService");
class ProductController {
    constructor() {
        this.productService = new ProductService_1.ProductService();
        this.list = (req, res) => {
            const products = this.productService.list();
            return res.json(products);
        };
        this.create = (req, res) => {
            try {
                const product = this.productService.create(req.body);
                return res.status(201).json(product);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        };
    }
}
exports.ProductController = ProductController;
