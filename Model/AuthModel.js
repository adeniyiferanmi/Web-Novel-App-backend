import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 6,
  },
  Profile: {
    type: String,
    required: true,
    enum: ["I'm an Author", "I'm a Reader"],
    default: "I'm a Reader",
  },
  PenName: {
    type: String,
    required: false,
  },
});

const authModel = mongoose.model("auth", authSchema);

export default authModel;
