const mongoose = require('mongoose');
const { User } = require("../Models/Model")


const Inscription = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const data = req.body;
    const newUser = new User({
      prenom: data.prenom,
      nomFamille: data.nomFamille,
      email: data.email,
      pseudo: data.pseudo,
      isPay: false
    });
    newUser.password = newUser.generateHash(data.password);
    req.session.pseudo = data.pseudo;
    await newUser.save();
    return res.status(200).send('Données enregistrées avec succès');
  } catch (error) {
    console.error('erreur durant l inscription', error);
    res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
  }
}

const Connexion = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor');
    const data = req.body;
    const findUserPseudo = await User.findOne({ pseudo: data.pseudo }).exec();
    if (findUserPseudo === null) {
      return res.status(401).send("Nom d'utilisateur/Mot de passe incorrect");
    }
    if (!findUserPseudo.validPassword(data.password)) {
      return res.status(402).send("Nom d'utilisateur/Mot de passe incorrect");
    }
    req.session.pseudo = data.pseudo;
    return res.status(200).send("connexion reussie");
  } catch (error) {
    console.error('erreur durant la connexion', error);
    res.status(500).send("erreur lors de l'inscription/erreur au niveau du backend");
  }
}

const changePwd = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')
    const datas = req.body

    if (datas.pass !== datas.confirmPass)
      return res.status(401).send('Les deux mots de pass ne correspondent pas')

    const currentUser = await User.findOne(
      { email: datas.email }
    ).exec()

    if (currentUser == null)
      return res.status(402).send()

    const result = await User.updateOne(
      { email: datas.email },
      { $set: { password: currentUser.generateHash(datas.pass) } }
    ).exec()

    if (result)
      return res.status(200).send('Mot de passe modifier avec succes')

  } catch (error) {
    console.error('error when updating the pass word', error)
  }
}

const isConnect = async (req, res) => {
  if (req.session.pseudo == null) {
    return res.status(200).send(false);
  }
  else {
    return res.status(200).send(true);
  }
}

const disconnection = async (req, res) => {
  req.session.pseudo = null;
  return res.status(200).send(false);
}

const VerifySuccessPayment = async (req, res) => {
  if (req.session.succesPayment == true) {
    req.session.succesPayment = false;
    return res.status(200).send(true);
  }
  else {
    return res.status(200).send(false);
  }
}
module.exports = {
  Inscription,
  Connexion,
  changePwd,
  isConnect,
  disconnection,
  VerifySuccessPayment
};