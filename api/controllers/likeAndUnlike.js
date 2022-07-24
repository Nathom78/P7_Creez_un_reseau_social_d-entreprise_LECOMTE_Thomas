const Post = require("../models/posts.model");

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    // res.status(200).json({post});
    if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
      // misajour de la db
      Post.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: req.body.like++ },
          $push: { usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(201).json({ message: "Like ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
    }

    if (post.usersLiked.includes(req.body.userId) && req.body.like === 0) {
      Post.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: -1 },
          $pull: { usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(201).json({ message: "Like supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    }

    //     //? ^^^^^^^^^^^^^^^^^^^^^^^ dislike ^^^^^^^^^^^^^^^^^^^^^^^^
  });
  //   .catch((error) => res.status(400).json({ error }));
};
