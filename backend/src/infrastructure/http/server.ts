import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";
import postRoutes   from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes"
import cors from "cors";

const createServer = (): Application => {
  const app: Application = express();

  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

  // Middleware pour parser le JSON
  app.use(express.json());

  // toutes les routes
  app.use("/api/auth",authRoutes);
  app.use("/api/posts",postRoutes);
  app.use("/api/users", userRoutes);

  //route de test
  app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "MiniSocial API is running" });
  });

  return app;
};

export default createServer;