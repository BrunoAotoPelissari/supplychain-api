import { Request, Response } from "express";

export class ProductController {
  list = (req: Request, res: Response) => {
    return res.json({ message: "Lista de produtos" });
  };

  create = (req: Request, res: Response) => {
    const { name, price } = req.body;

    return res.status(201).json({
      message: "Produto criado com sucesso",
      data: { name, price },
    });
  };
}
