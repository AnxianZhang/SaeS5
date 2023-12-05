const mongoose = require('mongoose');
const { User } = require("../Models/Model")

const Inscription  = async(req, res) =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
        const data  = req.body;
        const newUser = new User({
          prenom : data.prenom,
          nomFamille : data.nomFamille,
          email : data.email,
          pseudo : data.pseudo
        });
        newUser.password = newUser.generateHash(data.password);
        await newUser.save();
        return res.status(200).send('Données enregistrées avec succès');
      } catch (error) {
        console.error('erreur durant l inscription', error);
        res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
      }
}

const Connexion  = async(req, res) =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
        const data  = req.body;
        const findUserPseudo = await User.findOne({pseudo : data.pseudo}).exec();
        if(findUserPseudo === null){
            return res.status(401).send("Nom d'utilisateur/Mot de passe incorrect");
        }
        if(!findUserPseudo.validPassword(data.password)){
            return res.status(402).send("Nom d'utilisateur/Mot de passe incorrect");
        }
        return res.status(200).send("connexion reussie");
      } catch (error) {
        console.error('erreur durant la connexion', error);
        res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
      }
}

module.exports = {
    Inscription,
    Connexion
};