const { model, Schema } = require("mongoose");

const authorSchema = new Schema({
  name: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = model("Author", authorSchema);
