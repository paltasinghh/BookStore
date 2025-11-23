import mongoose from "mongoose";

export const connectDB = async (MongoDBURI) => {
  try {
    await mongoose.connect(MongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("👍 Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};
