const User = require("../models/User");
const Annonce = require("../models/Annonce");
const Commande = require("../models/Commande");
const ProduitPanier = require("../models/ProduitPanier");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// POST ( inscription d'un utilisateur )
exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    user.password = undefined;
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// POST ( connexion d'un utilisateur )
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne().where("email").equals(email);

    if (!user) {
      return res.status(400).json("l'adresse email n'existe pas");
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Mot de passe incorrecte");
    }

    let token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);
    token = `Bearer ${token}`;
    user.password = undefined;
    res.cookie("token", token, { httpOnly: true });
    let annonces = await Annonce.find({ user: user._id }).sort("-updatedAt");
    let produitPaniers = await ProduitPanier.find()
      .where("user", user._id)
      .where("bought", false)
      .populate("annonce");
    const commandes = await Commande.find({ user: user._id }).populate(
      "orderItems"
    );

    for (let item of commandes) {
      for (let item2 of item.orderItems) {
        await item2.populate("annonce");
      }
    }

    res.json({ user, annonces, produitPaniers, commandes });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// PUT ( mettre à jours un user avec son id )
exports.updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);

    if (!user) {
      return res.status(400).json("id n'existe pas");
    }

    if (id != req.payload.id) {
      return res.status(401).json("unauthorized");
    }

    user.fullname = req.body.fullname;
    user.email = req.body.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.file) {
      await fs.unlink(user.photoProfile);
      user.photoProfile = `uploads/user/${req.file.filename}`;
    }

    await user.save();
    user.password = undefined;
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// DELETE ( logout un utilisateur )
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token").json("logged out");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET ( Récupere l'utilisateur connecté )
exports.getMe = async (req, res) => {
  try {
    let user = await User.findById(req.payload.id).select("-password");
    if (!user) {
      return res.status(400).json("L'id de l'utilisateur n'existe pas ");
    }

    let token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);
    token = `Bearer ${token}`;
    res.cookie("token", token, { httpOnly: true });
    let annonces = await Annonce.find({ user: user._id }).sort("-updatedAt");
    let produitPaniers = await ProduitPanier.find()
      .where("user", req.payload.id)
      .where("bought", false)
      .populate("annonce");
    let commandes = await Commande.find({ user: req.payload.id }).populate(
      "orderItems"
    );

    // récuperer l'annonce qui a été acheter
    for (let item of commandes) {
      for (let item2 of item.orderItems) {
        await item2.populate("annonce");
      }
    }

    res.json({ user, annonces, produitPaniers, commandes });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
