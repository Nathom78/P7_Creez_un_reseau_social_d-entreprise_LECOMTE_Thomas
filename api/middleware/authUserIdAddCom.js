const jwt = require("jsonwebtoken");
const Post = require("../models/posts.model");
module.exports = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];      
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;            
   
    Post.findOne({ _id: req.params.id })
    .then(() => {  
        // pour ajouter un commentaire, il faut que le commenterId envoyé du front soit l'userId du token
        if ((req.body.commenterId !== userId) ) { 
            res.status(403).json({ message: "Requête bloquée" });
        } else {            
            next();
        }
        })
    .catch((error) => { 
    res.status(401).json({ error }); 
});  
}  