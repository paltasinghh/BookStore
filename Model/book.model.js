import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  category: {
    type: String,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Science",
      "Biography",
      "History",
      "Children",
      "Fantasy",
      "Romance",
      "Horror",
      "Self-Help",
      "Health",
      "Travel",
      "Guide",
      "Religion",
      "Science Fiction",
      "Poetry",
      "Comics",
      "Art",
      "Cookbook",
      "Diary",
      "Journal",
      "Math",
      "Other",
    ],
    default: "Other",
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  fileUrl: {
    type: String,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    }, { timestamps: true });
const Book = mongoose.model("Book", bookSchema);

export default Book;


// add