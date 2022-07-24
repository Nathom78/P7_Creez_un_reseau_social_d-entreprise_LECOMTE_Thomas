const UserModel = require("../models/user.model");
const fs = require("fs");

exports.uploadProfil = (req, res) => {
  if (req.file != null) {
    UserModel.findOne({ _id: req.body.userId })
      .then((user) => {
        const filename = user.avatar.split("/medias/")[1];
        fs.unlink(`medias/${filename}`, (err) => {
          UserModel.findOneAndUpdate(
            { _id: req.body.userId },
            {
              $set: {
                avatar: `${req.protocol}://${req.get("host")}/medias/${
                  req.file.filename
                }`,
              },
            }
          )
            .then((user) => res.status(200).json({ message: "success" }))
            .catch((err) =>
              res.satust(400).json({ error: err, message: "error" })
            );
        });
      })
      .catch((err) => res.status(500).json(err));
  }
};
