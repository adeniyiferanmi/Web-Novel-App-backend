import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.Cloudinary_name,
  api_key: process.env.Cloudinary_key,
  api_secret: process.env.cloudinary_secret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "novels_covers",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
export const upload = multer({ storage });
