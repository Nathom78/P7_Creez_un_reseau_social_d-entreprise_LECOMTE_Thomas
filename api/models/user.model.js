const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, default: "user" },
    bio: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam impedit aliquam consequuntur odio amet eum accusamus explicabo corporis, est magni. ",
    },
    avatar: {
      type: String,
      default:
        "https://img.myloview.fr/papiers-peints/humain-homme-personne-avatar-profil-utilisateur-vector-icon-illustration-700-80657983.jpg",
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
