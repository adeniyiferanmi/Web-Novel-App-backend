import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    chapterTitle: {
      type: String,
      required: true,
      trim: true,
    },
    chapterNumber: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    novel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
      required: true,
    },
    wordCount: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  { timestamps: true },
);

chapterSchema.pre("save", function (next) {
  if (this.isModified("content")) {
    this.wordCount = this.content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }

  next();
});

const chapterModel = mongoose.model("chapter", chapterSchema);
export default chapterModel;
