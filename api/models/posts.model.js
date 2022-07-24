const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    usersLiked: { type: Array },
    comments: {
      type: [
        {
          commenterId: String,
          commenterName: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
