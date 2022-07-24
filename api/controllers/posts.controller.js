const Post = require("../models/posts.model");
const userModel = require("../models/user.model");
const fs = require('fs');

exports.createPost = (req, res) => {
  if (req.file) {
    const post = new Post({
      ...req.body,
      posterId: req.body.posterId,
      imageUrl: `${req.protocol}://${req.get("host")}/medias/${
        req.file.filename
      }`,
    });
    post
      .save()
      .then((post) => res.json(post))
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    const post = new Post({
      ...req.body,
      posterId: req.body.posterId,
      message: req.body.message,
    });
    post
      .save()
      .then((post) => res.status(200).json(post))
      .catch((err) => res.status(400).json("Error: " + err));
  }
};

exports.updatePost = (req, res) => {
  // suprimer l'ancienne image si on la modifie
  if (req.file)
    {     
      Post.findOne({ _id: req.params.id })
      .then(post => {        
        const filename = post.imageUrl.split('/images/')[1];
        fs.exists(`medias/${filename}`, (exist) => {          
          if(exist) fs.unlink(`medias/${filename}`,() => {})
        });        
      })
      .catch(error => res.status(500).json({ error }));
  }
  
  const postObject = req.file ?
  {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`
  } :
  { ...req.body };

  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
  .then((post) => res.status(200).json(post))
  .catch(err => res.status(400).json("Error: " + err));     
};

exports.deletePost = async (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      
      if (!post) {
        res.status(404).json({
          error: new Error('aucun post!')
        });
      }
      
      const filename = post.imageUrl.split('/medias/')[1];
      fs.exists(`medias/${filename}`, (exist) => {          
        if(exist) fs.unlink(`medias/${filename}`,() => {})

      });
      Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getPosts = async (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
};

// ^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.likePost = async (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: { likes: req.params.id },
    },
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));

  userModel
    .findByIdAndUpdate(
      req.body.userId,
      {
        $push: { likedPosts: req.params.id },
      },
      { new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.unlikePost = async (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: req.params.id },
    },
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));

  userModel
    .findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { likedPosts: req.params.id },
      },
      { new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

// ^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.commentPost = async (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          ...req.body,
          timestamp: new Date().getTime(),
        },
      },
    },
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteComment = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { comments: { _id: req.body.commentId } } },
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
};
