import { Router } from "express";
import {
  addNovel,
  deleteSingleNovel,
  getAuthorNovels,
  getSingleNovel,
  updateSingleNovel,
} from "../Controller/NovelController.js";
import { upload } from "../Config/Cloudinary.js";
import isLoggedin from "../Middleware/isLoggedin.js";
import { verifyToken } from "../Controller/AuthController.js";

const novelRouter = Router();
novelRouter.post(
  "/addnovel",
  verifyToken,
  upload.single("coverImage"),
  addNovel,
);
novelRouter.get("/author-novel", verifyToken, getAuthorNovels);
novelRouter.put(
  "/update-novel/:novelId",
  verifyToken,
  upload.single("coverImage"),
  updateSingleNovel,
);
novelRouter.delete("/delete-novel/:novelId", verifyToken, deleteSingleNovel);
novelRouter.get(
  "/single-novel/:novelId",
  verifyToken,
  upload.single("coverImage"),
  getSingleNovel,
);

export default novelRouter;
