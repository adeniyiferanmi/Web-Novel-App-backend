import chapterModel from "../Model/ChaptersModel.js";
import NovelModel from "../Model/NovelModel.js";

export const addChapter = async (req, res, next) => {
  const { novelId } = req.params;
  const { chapterTitle, chapterNumber, content, status } = req.body;
  try {
    const novel = await NovelModel.findOne({
      _id: novelId,
      author: req.user._id,
    });
    console.log("Novel ID:", novelId);
    console.log("User ID:", req.user._id);
    // if (!novel) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "Novel not found or unauthorized",
    //   });
    // }
    const chapter = await chapterModel.create({
      ...req.body,
      novel: novelId,
      author: req.user._id,
    });
    console.log(chapter);

    novel.chapters.push(chapter._id);
    await novel.save();
    if (!chapter) {
      return res.status(400).json({
        status: "error",
        message: "Unable to add Chapter",
      });
    }
    res.status(201).json({
      status: "success",
      message: "Chapter added successfully",
      data: chapter,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
