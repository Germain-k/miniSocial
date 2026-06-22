import express, { Application } from "express";

const createServer = (): Application => {
  const app: Application = express();

  // Middleware pour parser le JSON
  app.use(express.json());

  // Route de test
  app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "MiniSocial API is running" });
  });

  return app;
};

export default createServer;