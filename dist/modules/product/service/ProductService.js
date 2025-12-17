"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const ProductRepository_1 = require("../repository/ProductRepository");
class ProductService {
    constructor(productRepository = new ProductRepository_1.ProductRepository()) {
        this.productRepository = productRepository;
    }
    list() {
        return this.productRepository.findAll();
    }
    create(data) {
        if (!data.name) {
            throw new Error("Nome do produto é obrigatório");
        }
        if (data.price <= 0) {
            throw new Error("Preço deve ser maior que zero");
        }
        return this.productRepository.create(data);
    }
}
exports.ProductService = ProductService;
