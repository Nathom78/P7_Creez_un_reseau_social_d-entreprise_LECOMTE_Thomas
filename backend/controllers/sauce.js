const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'enregistré!'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


exports.modifySauce = (req, res, next) => {

  // suprimer l'ancienne image si on la modifie
  if (req.file)
    {     
      Sauce.findOne({ _id: req.params.id })
      .then(sauce => {        
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.exists(`images/${filename}`, (exist) => {          
          if(exist) fs.unlink(`images/${filename}`,() => {})
        });        
      })
      .catch(error => res.status(500).json({ error }));
  }
  
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } :
  { ...req.body };

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));     
};


exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      
      if (!sauce) {
        res.status(404).json({
          error: new Error('aucune sauce!')
        });
      }
      if (sauce.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error('requéte non autorisé!')
        });
      }

      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeSauce = (req, res, next) => {
  
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {    
    var indexOfUserLiked = sauce.usersLiked.indexOf(req.body.userId);
    var indexOfUserDisliked = sauce.usersDisliked.indexOf(req.body.userId);
    
    switch (req.body.like) {
      
      //Si l'utilisateur dislike : 
      case -1:
        if(indexOfUserDisliked == -1){
          sauce.dislikes++;
          sauce.usersDisliked.push(req.body.userId);
        }        
      break;

      //Si like ou dislike ! de 0, on retire le like / dislike'
      case 0:
        //Si la sauce est déjà liké :          
        if (indexOfUserLiked > -1) {
          sauce.likes--;
          sauce.usersLiked.splice(indexOfUserLiked,1);            
        }
        //Si la sauce est déjà disliké :
        if (indexOfUserDisliked > -1) {
          sauce.dislikes--;
          sauce.usersDisliked.splice(indexOfUserDisliked,1);
        }          
      break;

      //Si l'utilisateur like la sauce :
      case 1:
        if(indexOfUserLiked == -1){
          sauce.likes++;
          sauce.usersLiked.push(req.body.userId);
        }         
      break;

      // sinon il y a une erreur  
      default:
        return res.status(500).json({ error });
    }

    Sauce.updateOne({ _id: req.params.id }, {
      usersLiked: sauce.usersLiked,
      usersDisliked : sauce.usersDisliked,
      likes: sauce.likes,
      dislikes: sauce.dislikes,
      _id: req.params.id
    })
    .then(() => res.status(201).json({ message: 'Avis pris en compte !' }))
    .catch(error => res.status(400).json({ error }));
    
  })
  .catch(error => res.status(500).json({ error }));  
}; 