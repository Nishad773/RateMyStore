import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { login, signup, me } from "./routes/auth";
import { listStores, rateStore, ownerStats } from "./routes/stores";
import { adminStats, listStoresAdmin, listUsers } from "./routes/admin";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/login", login);
  app.get("/api/me", me);

  // Stores and ratings
  app.get("/api/stores", listStores);
  app.post("/api/stores/:storeId/rate", rateStore);

  // Owner
  app.get("/api/owner/stats", ownerStats);

  // Admin
  app.get("/api/admin/stats", adminStats);
  app.get("/api/admin/users", listUsers);
  app.get("/api/admin/stores", listStoresAdmin);

  return app;
}
