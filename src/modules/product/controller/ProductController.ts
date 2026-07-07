import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";

export class ProductController {

  private productService = new ProductService();

  list = (req: Request, res: Response) => {
    const products = this.productService.list();
    return res.json(products);
  };

  getById = (req: Request, res: Response) => {
    try {
      const product = this.productService.getById(req.params.id);
      return res.json(product);
    } catch (error: any) {
      return res.status(404).json({
        error: error.message
      });
    }
  };

  create = (req: Request, res: Response) => {
    try {
      const product = this.productService.create(req.body);
      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  update = (req: Request, res: Response) => {
    try {
      const product = this.productService.update(
        req.params.id,
        req.body
      );

      return res.json(product);

    } catch (error: any) {
      return res.status(404).json({
        error: error.message
      });
    }
  };

  delete = (req: Request, res: Response) => {
    try {
      this.productService.delete(req.params.id);

      return res.status(204).send();

    } catch (error: any) {
      return res.status(404).json({
        error: error.message
      });
    }
  };

}
