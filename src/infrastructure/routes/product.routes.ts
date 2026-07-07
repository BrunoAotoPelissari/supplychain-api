import { Router } from "express";
import { ProductController } from "../../modules/product/controller/ProductController";

const router = Router();
const controller = new ProductController();

router.get("/", controller.list);
router.get("/:id", controller.getById);

router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;