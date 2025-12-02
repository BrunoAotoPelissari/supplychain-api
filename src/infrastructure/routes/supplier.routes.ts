import { Router } from "express";

const router = Router();

const suppliers = [
  { id: "1", name: "Seara", contactEmail: "contato@seara.com" },
  { id: "2", name: "Mercado Livre", contactEmail: "suporte@mercadolivre.com" }
];

router.get("/", (req, res) => res.json(suppliers));

router.post("/", (req, res) => {
  const { name, contactEmail } = req.body;
  const newSupplier = { id: String(suppliers.length + 1), name, contactEmail };
  suppliers.push(newSupplier);
  res.status(201).json(newSupplier);
});

export default router;
