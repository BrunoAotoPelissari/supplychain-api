import app from "./infrastructure/express/app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 LogisticsHub API rodando em http://localhost:${PORT}`);
  console.log(`📘 Documentação: http://localhost:${PORT}/api-docs`);
});
