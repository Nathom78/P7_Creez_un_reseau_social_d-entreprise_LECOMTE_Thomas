require("dotenv").config( { path: "./config/.env" } );
const express = require("express");
const app = express();

//const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");


//app.use(cookieParser(process.env.COOKIE_SIGN));

// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!

var helmet = require('helmet');   
app.use(helmet());

/* configuration CORS */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});

//Middleware
app.use(express.json());

app.use(cors());

//connexion to mongoDB
require("./config/mongoDB");

//path
app.use("/medias", express.static(path.join(__dirname, "medias")));

//Routes
const userRouter = require("./router/user.routes");
const postRouter = require("./router/posts.routes");

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

module.exports = app;    
