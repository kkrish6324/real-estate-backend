import mongoose from "mongoose";
import dns from "dns";

// Workaround for Windows NodeJS SRV ECONNREFUSED error
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI missing in environment");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}
