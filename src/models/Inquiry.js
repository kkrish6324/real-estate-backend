import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    propertyId: {
      type: String,
      default: "General",
    },
    propertyTitle: {
      type: String,
      default: "General Contact Forms",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Inquiry = mongoose.model("Inquiry", inquirySchema);
