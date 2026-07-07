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

  findById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
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

  update(id: string, data: CreateProductDTO): Product {
    const product = this.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    product.name = data.name;
    product.price = data.price;

    return product;
  }

  delete(id: string): void {
    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      throw new Error("Produto não encontrado");
    }

    this.products.splice(index, 1);
  }

}
