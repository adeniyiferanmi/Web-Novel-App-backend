import mongoose from "mongoose";

const novelSchema = new mongoose.Schema(
  {
    novelTitle: {
      type: String,
      required: true,
      trim: true,
    },
    genres: {
      type: String,
      required: true,
      enum: [
        "Literary Fiction",
        "Romance",
        "Historical",
        "Horror",
        "Mystery",
        "Fantasy",
        "Science Fiction",
        "Thriller",
        "Adventure",
        "Young Adult",
      ],
      default: "Romance",
    },
    synopsis: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth", // reference to your auth model
      required: true,
    },
    coverImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Draft", "Published", "Ongoing", "Completed"],
      default: "Draft",
      required: true,
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    totalReaders: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }, 
);

export default mongoose.model("Novel", novelSchema);
