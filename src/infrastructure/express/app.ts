import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import supplierRoutes from "../../routes/supplier.routes";
import productRoutes from "../../routes/product.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger Docs
const swaggerDocument = YAML.load("./src/docs/swagger/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

export default app;
