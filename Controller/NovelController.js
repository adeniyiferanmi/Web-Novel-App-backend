import NovelModel from "../Model/NovelModel.js";

export const addNovel = async (req, res, next) => {
  const { novelTitle, genres, synopsis } = req.body;

  try {
    const novel = await NovelModel.create({
      ...req.body,
      author: req.user._id,
      coverImage: req.file?.path,
    });
    if (!novel) {
      return res.status(400).json({
        status: "error",
        message: "unable to add novel",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Novel Added Successfully",
      data: novel,
    });
    console.log("req.body:", req.body);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAuthorNovels = async (req, res, next) => {
  const authorId = req.user_id;

  try {
    const novel = await NovelModel.find({ authorId });
    if (!novel || novel.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No novel found for this author",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Authors Novels Retrieved",
      data: novel,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const updateSingleNovel = async (req, res, next) => {
  const { novelId } = req.params;
  const { novelTitle, genres, synopsis, status } = req.body;
  if (!novelId) {
    return res.status(400).json({
      status: "error",
      message: "Novel ID is required",
    });
  }
  try {
    const novel = await NovelModel.findByIdAndUpdate(
      novelId,
      {
        ...req.body,
        ...(req.file && { coverImage: req.file.path }),
      },
      { returnDocument: "after" },
    );
    if (!novel) {
      return res.status(400).json({
        status: "error",
        message: "Novel not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Novel updated successfully",
      data: novel,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteSingleNovel = async (req, res, next) => {
  const { novelId } = req.params;
  if (!novelId) {
    return res.status(400).json({
      status: "error",
      message: "Novel ID is required",
    });
  }
  try {
    const novel = await NovelModel.findByIdAndDelete(novelId);
    if (!novel) {
      return res.status(400).json({
        status: "error",
        message: "Novel not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Novel deleted successfully",
      data: novel,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSingleNovel = async (req, res, next) => {
  const { novelId } = req.params;
  if (!novelId) {
    return res.status(400).json({
      status: "error",
      message: "Novel ID is required",
    });
  }

  try {
    const novel = await NovelModel.findById(novelId);
    if (!novel) {
      return res.status(400).json({
        status: "error",
        message: "Novel not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Novel retrieved successfully",
      data: novel,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
