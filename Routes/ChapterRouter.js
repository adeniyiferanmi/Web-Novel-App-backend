import { Router } from "express";
import { addChapter } from "../Controller/ChapterController.js";
import { verifyToken } from "../Controller/AuthController.js";

const chapterRouter = Router();

chapterRouter.post("/addchapter/:novelId", verifyToken, addChapter);

export default chapterRouter;
