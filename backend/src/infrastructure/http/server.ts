import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";

const createServer = (): Application => {
  const app: Application = express();

  // Middleware pour parser le JSON
  app.use(express.json());

  // toutes les routes auth sous /api/auth
  app.use("/api/auth",authRoutes);

  //route de test
  app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "MiniSocial API is running" });
  });

  return app;
};

export default createServer;