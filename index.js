import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Check DB URI
if (!URI) {
  console.error(" MongoDB URI not defined in .env file");
  process.exit(1);
}


await connectDB(URI);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
