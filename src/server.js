import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";

const app = express();
const port = Number(process.env.PORT) || 5000;
const envOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([
  ...envOrigins,
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);
const vercelPreviewOriginPattern = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

function isAllowedOrigin(origin) {
  if (allowedOrigins.has(origin)) {
    return true;
  }

  // Allow Vercel preview/prod subdomains without needing redeploy per URL.
  return vercelPreviewOriginPattern.test(origin);
}

app.use(
  cors({
    origin(origin, callback) {
      // Allow tools/requests without browser Origin header.
      if (!origin) {
        return callback(null, true);
      }

      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, message: "Backend running" });
});

// Compatibility endpoints for frontend sections that can fall back to static UI content.
app.get("/api/properties", (_req, res) => res.status(200).json([]));
app.get("/api/agents", (_req, res) => res.status(200).json([]));
app.get("/api/blogs", (_req, res) => res.status(200).json([]));
app.get("/api/testimonials", (_req, res) => res.status(200).json([]));
app.get("/api/stats", (_req, res) => res.status(200).json([]));
app.get("/api/categories", (_req, res) => res.status(200).json([]));
app.get("/api/hero-slides", (_req, res) => res.status(200).json([]));
app.get("/api/settings", (_req, res) =>
  res.status(200).json({
    siteName: "BuilderFlooor",
    aboutText:
      "With over a decade of expertise in India's premium real estate market, BuilderFlooor helps clients find homes that match their aspirations.",
  }),
);

// Frontend admin context probes /api/auth/me on boot; return unauthorized instead of 404.
app.get("/api/auth/me", (_req, res) => res.status(401).json({ message: "Unauthorized" }));
app.post("/api/auth/refresh", (_req, res) =>
  res.status(401).json({ message: "No admin session available" }),
);

app.use("/api/users", userRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
