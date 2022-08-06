const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts.controller");
const auth = require("../middleware/auth");
const authUserId = require("../middleware/authUserId");
const multer = require("../middleware/multer");
const likeAndUnlikeCtrl = require("../controllers/likeAndUnlike");

router.get("/", auth, postCtrl.getPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", authUserId, multer, postCtrl.updatePost);
router.delete("/:id", authUserId, postCtrl.deletePost);

router.put("/like-post/:id", auth, likeAndUnlikeCtrl.likePost);
router.put("/unlike-post/:id", auth, likeAndUnlikeCtrl.likePost);

// comments
router.put("/comment-post/:id",authUserId, postCtrl.commentPost);
router.delete("/delete-comment/:id",authUserId, postCtrl.deleteComment);

module.exports = router;
