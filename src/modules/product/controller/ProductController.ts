import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";

export class ProductController {
  private productService = new ProductService();

  list = (req: Request, res: Response) => {
    const products = this.productService.list();
    return res.json(products);
  };

  create = (req: Request, res: Response) => {
    try {
      const product = this.productService.create(req.body);
      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
