import { Router } from "express";
import { ProductController } from "../../modules/product/ProductController";

const router = Router();
const controller = new ProductController();

router.get("/", controller.list);
router.post("/", controller.create);

export default router;
