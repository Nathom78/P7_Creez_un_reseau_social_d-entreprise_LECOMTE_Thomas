const jwt = require("jsonwebtoken");
const Sauce = require("../models/Sauce");

// Vérification du proprietaire de la sauce avec l'utilisateur, sans la requête dans le body, pour les routes PUT/DELETE

module.exports = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const token = req.headers.authorization.split(' ')[1];      
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      const userId = decodedToken.userId;
      if (sauce.userId && sauce.userId !== userId) {
        res.status(403).json({ message: "Requête bloquée" });
      } else {
        next();
      }
    })
    .catch((error) => {
      res.status(401).json({ error });
    });
};