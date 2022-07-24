const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const uploadAvatarCtrl = require("../controllers/upload.profil.controller");
const multer = require("../middleware/multer");

// Sign up and login routes
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);

// User routes
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getUser);
router.put("/:id", auth, userCtrl.updateUser);

// Upload avatar
router.post("/avatar", auth, multer, uploadAvatarCtrl.uploadProfil);

module.exports = router;
