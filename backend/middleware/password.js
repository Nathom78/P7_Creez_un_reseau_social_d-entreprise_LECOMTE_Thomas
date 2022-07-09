//const { default: mongoose } = require("mongoose");
const PasswordValidator = require("password-validator");

const passwordSchema = new PasswordValidator();

// Pré-requis mot de passe

passwordSchema
  .is().min(8) // Minimum length 8
  .is().max(16) // Maximum length 100
  .has().uppercase() // Must have uppercase letters
  .has().lowercase() // Must have lowercase letters
  .has().digits(2) // Must have at least 2 digits
  .has().not()
  .spaces() // Should not have spaces
  .is().not().oneOf(["Password", "Password123"]) // Blacklist these values
  .has().symbols();

// Validation du mot de passe en fonction de son schéma pour le SignUp

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return (
      res.writeHead(
        400,
        "Mot de passe non valide - Utilisez des majuscules, minuscules, chiffres et symboles, aucun espace, pour 8(min) à 16(max) caractères."
      ),
      res.end(
        "Mot de passe non valide - Utilisez des majuscules, minuscules, chiffres et symboles, aucun espace, pour 8(min) à 16(max) caractères."
      )
    );
  }
};