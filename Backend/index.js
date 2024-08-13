import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
//Initialize express app
const app = express();
//Middleware
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

console.log("MongoDB URI:", URI); // Add this line to log the URI

if (!URI) {
    console.error("MongoDB URI is not defined in the environment variables.");
    process.exit(1);
}

// Middleware to parse JSON requests


// Connect to MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });

// Define routes
app.use("/books", bookRoute);
app.use("/user",userRoute);

app.listen(PORT, () => {
    console.log(`Service is listening on port ${PORT}`);
});
