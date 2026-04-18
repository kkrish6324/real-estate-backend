import express from "express";
import {
  submitInquiry,
  getAllInquiries,
} from "../controllers/inquiryController.js";

const router = express.Router();

// Frontend submits to /api/inquiries; keep /submit for backward compatibility.
router.post("/", submitInquiry);
router.post("/submit", submitInquiry);
router.get("/", getAllInquiries);

export default router;
