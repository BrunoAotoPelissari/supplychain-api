import { Request, Response } from "express";

export class SupplierController {
  list = (req: Request, res: Response) => {
    res.json([{ message: "Listando fornecedores" }]);
  };

  create = (req: Request, res: Response) => {
    const { name, contactEmail } = req.body;

    res.status(201).json({ id: "1", name, contactEmail });
  };
}
