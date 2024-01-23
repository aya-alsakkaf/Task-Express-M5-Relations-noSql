const Post = require("../../models/Post");
const Author = require("../../models/Author");
const Tag = require("../../models/Tag");
exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res, next) => {
  try {
    const { author } = req.body;
    const newPost = await Post.create(req.body);
    const authorFound = await Author.findById(author);
    console.log(authorFound);
    await authorFound.updateOne({ $push: { posts: newPost._id } });
    return res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res) => {
  try {
    const posts = await Post.find().populate("author").populate("tags");
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

exports.getTags = async (req, res, next) => {
  try {
    const tag = await Tag.find();
    return res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

exports.addTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const tag = await Tag.findById(tagId);
    await Post.findByIdAndUpdate(req.post._id, {
      $push: { tags: tag._id },
    });

    await Tag.findByIdAndUpdate(tagId, {
      $push: { posts: req.post._id },
    });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
