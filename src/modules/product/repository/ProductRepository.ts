export interface CreateProductDTO {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export class ProductRepository {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  create(data: CreateProductDTO): Product {
    const product: Product = {
      id: crypto.randomUUID(),
      name: data.name,
      price: data.price,
    };

    this.products.push(product);
    return product;
  }
}
