import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import path from "path";
import SwaggerParser from "@apidevtools/swagger-parser";

import supplierRoutes from "../routes/supplier.routes";
import productRoutes from "../routes/product.routes";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ONLINE");
});

// Swagger Docs
const swaggerPath = path.resolve(
  __dirname,
  "../../docs/swagger/swagger.yaml"
);

async function setupSwagger() {
  const swaggerDocument = await SwaggerParser.bundle(swaggerPath);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
}

setupSwagger().catch(console.error);

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

export default app;
