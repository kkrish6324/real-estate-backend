import { Inquiry } from "../models/Inquiry.js";

export async function submitInquiry(req, res) {
  try {
    const { propertyId, propertyTitle, name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }

    const inquiry = await Inquiry.create({
      propertyId: propertyId || "General",
      propertyTitle: propertyTitle || "General Contact Form",
      name,
      email,
      phone: phone || "",
      message,
    });

    return res
      .status(201)
      .json({ message: "Inquiry submitted successfully", inquiry });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return res.status(500).json({ message: "Failed to submit inquiry" });
  }
}

export async function getAllInquiries(req, res) {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.status(200).json(inquiries);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch inquiries" });
  }
}
