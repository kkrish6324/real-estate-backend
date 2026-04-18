import express from "express";
import {
  submitInquiry,
  getAllInquiries,
} from "../controllers/inquiryController.js";

const router = express.Router();

router.post("/submit", submitInquiry);
router.get("/", getAllInquiries);

export default router;
