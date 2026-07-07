import {
  ProductRepository,
  CreateProductDTO,
  Product,
} from "../repository/ProductRepository";

export class ProductService {
  constructor(
    private productRepository = new ProductRepository()
  ) { }

  list(): Product[] {
    return this.productRepository.findAll();
  }

  getById(id: string): Product {
    const product = this.productRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
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

  update(id: string, data: CreateProductDTO): Product {

    if (!data.name) {
      throw new Error("Nome obrigatório");
    }

    if (data.price <= 0) {
      throw new Error("Preço inválido");
    }

    return this.productRepository.update(id, data);
  }

  delete(id: string): void {
    this.productRepository.delete(id);
  }

}
