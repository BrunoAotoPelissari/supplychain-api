import {
  ProductRepository,
  CreateProductDTO,
  Product,
} from "../repository/ProductRepository";

export class ProductService {
  constructor(
    private productRepository = new ProductRepository()
  ) {}

  list(): Product[] {
    return this.productRepository.findAll();
  }

  create(data: CreateProductDTO): Product {
    if (!data.name) {
      throw new Error("Nome do produto é obrigatório");
    }

    if (data.price <= 0) {
      throw new Error("Preço deve ser maior que zero");
    }

    return this.productRepository.create(data);
  }
}
