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
            // cherche le commentaire depuis le postId dans la req.params et depuis commentId dans req.body
            // afin de trouver le commenterId (créateur du commentaire)
            post.comments.map( comment => {                
                let newcommentId = JSON.stringify(comment._id);
                newcommentId = newcommentId.replace(/^"(.*)"$/, '$1');
                if (newcommentId == req.body.commentId){
                    // si le userId du token n'est pas celui qui a créé le commentaire
                    if (comment.commenterId !== userId){                        
                        res.status(403).json({ message: "Requête bloquée" });   
                    }else{
                    next(); 
                    }
                }
            });           
        })
        .catch((error) => { 
            res.status(401).json({ error }); 
        }); 
           
    };
}  