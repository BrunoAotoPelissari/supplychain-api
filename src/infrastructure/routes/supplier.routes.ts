import { Router } from "express";
import { SupplierController } from "./SupplierController";

const router = Router();
const controller = new SupplierController();

router.get("/", controller.list);
router.post("/", controller.create);

export default router;
