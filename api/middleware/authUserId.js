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
                        
            // Pour la supression ou modification de post où l'on doit juste verifier que l'userId du token soit le créateur du post,
           
            if ((post.posterId !== userId)) { 
                res.status(403).json({ message: "Requête bloquée" });
            } else {            
                next();
            }
        })
        .catch((error) => { 
            res.status(401).json({ error }); 
        }); 
           
    };
}  