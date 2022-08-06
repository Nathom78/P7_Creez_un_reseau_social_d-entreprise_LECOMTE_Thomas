const jwt = require("jsonwebtoken");
const Post = require("../models/posts.model");
module.exports = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];      
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    
    const roleToken = decodedToken && decodedToken.role;
      
    if (roleToken ==="admin") next(); /* si admin dans le token, il peut supprimer et modifier */
    else{
       Post.findOne({ _id: req.params.id })
        .then((post) => {  

        /* soit le userId du token, est celui du créateur dans la BD, 
        pour modifier,suprimmer un post ou un commentaire,
         mais pour ajouter un commentaire, il suffit que le userId soit celui du commentateur dans la req */

        if ((post.posterId !== userId)&&(req.body.commenterId && req.body.commenterId !== userId) ) { 
            res.status(403).json({ message: "Requête bloquée" });
        } else {            
            next();
        }
        })
        .catch((error) => {
        res.status(401).json({ error });
    }); 
    }    
};  