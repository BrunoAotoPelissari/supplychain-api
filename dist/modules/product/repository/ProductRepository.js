"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    constructor() {
        this.products = [];
    }
    findAll() {
        return this.products;
    }
    create(data) {
        const product = {
            id: crypto.randomUUID(),
            name: data.name,
            price: data.price,
        };
        this.products.push(product);
        return product;
    }
}
exports.ProductRepository = ProductRepository;
