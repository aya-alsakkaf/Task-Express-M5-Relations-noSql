const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  name: String,
  post: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = model("Tag", tagSchema);
