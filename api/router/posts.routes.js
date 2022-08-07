const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts.controller");
const auth = require("../middleware/auth");
const authUserId = require("../middleware/authUserId");
const authUserIdAddCom = require("../middleware/authUserIdAddCom");
const authUserIdDelCom = require("../middleware/authUserIdDelCom");
const multer = require("../middleware/multer");
const likeAndUnlikeCtrl = require("../controllers/likeAndUnlike");

// Posts

router.get("/", auth, postCtrl.getPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", authUserId, multer, postCtrl.updatePost);
router.delete("/:id", authUserId, postCtrl.deletePost);

// Likes
router.put("/like-post/:id", auth, likeAndUnlikeCtrl.likePost);
router.put("/unlike-post/:id", auth, likeAndUnlikeCtrl.likePost);

// comments
router.put("/comment-post/:id",authUserIdAddCom, postCtrl.commentPost);
router.delete("/delete-comment/:id",authUserIdDelCom, postCtrl.deleteComment);

module.exports = router;
