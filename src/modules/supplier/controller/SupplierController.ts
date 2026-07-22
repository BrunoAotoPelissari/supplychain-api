import { Request, Response } from "express";
import { SupplierService } from "../service/SupplierService";

export class SupplierController {
  private supplierService = new SupplierService();

  list = async (req: Request, res: Response) => {
    try {
      const suppliers = await this.supplierService.list();

      return res.json(suppliers);
    } catch (error: any) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const supplier = await this.supplierService.getById(req.params.id);

      return res.json(supplier);
    } catch (error: any) {
      return res.status(404).json({
        error: error.message,
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const supplier = await this.supplierService.create(req.body);

      return res.status(201).json(supplier);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const supplier = await this.supplierService.update(
        req.params.id,
        req.body
      );

      return res.json(supplier);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.supplierService.delete(req.params.id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({
        error: error.message,
      });
    }
  };
}