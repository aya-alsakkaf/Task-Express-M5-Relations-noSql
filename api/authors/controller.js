const Author = require("../../models/Author");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().populate("posts");
    return res.status(200).json({ message: authors });
  } catch (error) {
    next(error);
  }
};

const getAuthor = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const author = await Author.findById(_id);
    if (author == null) {
      return res.status(404).json({ message: "Cannot find author" });
    }
    res.json(author);
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    return res.status(201).json({ message: author });
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const deleted = await Author.findByIdAndDelete(_id);
    if (deleted) {
      return res.status(200).json({ message: "Author deleted" });
    } else {
      return res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const author = await Author.findByIdAndUpdate(_id, req.body);
    return res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAuthors,
  getAuthor,
  createAuthor,
  deleteAuthor,
  updateAuthor,
};
