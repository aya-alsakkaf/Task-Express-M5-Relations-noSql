const express = require("express");
const authorsRouter = express.Router();

const {
  getAllAuthors,
  getAuthor,
  createAuthor,
  deleteAuthor,
  updateAuthor,
} = require("./controller.js");

authorsRouter.get("/", getAllAuthors);
authorsRouter.get("/:_id", getAuthor);
authorsRouter.post("/", createAuthor);
authorsRouter.delete("/:_id", deleteAuthor);
authorsRouter.put("/:_id", updateAuthor);

module.exports = authorsRouter;
