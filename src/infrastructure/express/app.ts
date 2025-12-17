import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import supplierRoutes from "../routes/supplier.routes.js";
import productRoutes from "../routes/product.routes";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger Docs
const swaggerPath = path.resolve(
  __dirname,
  "../../docs/swagger/swagger.yaml"
);

const swaggerDocument = YAML.load(swaggerPath);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

export default app;
