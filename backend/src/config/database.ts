import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI
    if(!mongoUri) {
      throw new Error("MONGODB_URI environment variable isn't defined")
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Successfully ✅");
  } catch (error) {
    console.error("Error connecting to MongoDB ❌", error);
    process.exit(1); // Exit with failure
    // Status 1 means failure
    // Status 0 means success
  }
};

export default connectDB;