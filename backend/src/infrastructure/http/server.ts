import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";
import postRoutes   from "./routes/postRoutes"

const createServer = (): Application => {
  const app: Application = express();

  // Middleware pour parser le JSON
  app.use(express.json());

  // toutes les routes
  app.use("/api/auth",authRoutes);
  app.use("/api/posts",postRoutes);

  //route de test
  app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "MiniSocial API is running" });
  });

  return app;
};

export default createServer;