require("dotenv").config( { path: "./config/.env" } );

const mongoose = require("mongoose");

const DB = {
  DB_ID: process.env.DB_ID,
  DB_ADDRESS: process.env.DB_ADDRESS,
  DB_MDP: process.env.DB_MDP,
};

const url = "mongodb+srv://"+DB.DB_ID+":"+DB.DB_MDP+"@"+DB.DB_ADDRESS;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected 👌"))
  .catch((err) => console.log("MongoDB Error 😤: " + err));

module.exports = mongoose;
