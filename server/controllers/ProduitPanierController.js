const ProduitPanier = require("../models/ProduitPanier");
const Annonce = require("../models/Annonce");

// POST pour créer un nouveau produitPanier
exports.addToPanier = async (req, res) => {
  try {
    req.body.user = req.payload.id;
    let annonce = await Annonce.findById(req.body.annonce);

    if (req.body.qteAchat <= 0) {
      return res.status(400).json("quantité invalid");
    }
    if (annonce.qteDispo < req.body.qteAchat) {
      return res.status(400).json("quantité indisponible");
    }

    let panier = await ProduitPanier.find()
      .where("user")
      .equals(req.payload.id)
      .populate("annonce");

    // check if it is already in the cart
    let tmp = panier.find((elt) => elt.annonce._id == req.body.annonce);

    if (!tmp) {
      let produitPanier = await ProduitPanier.create(req.body);
      produitPanier = await produitPanier.populate("annonce");
      return res.status(201).json(produitPanier);
    }

    tmp.qteAchat = req.body.qteAchat;
    await tmp.save();
    res.json(tmp);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET pour récuperer les produitPanier de l'utilisateur connecté
exports.getPanierUser = async (req, res) => {
  try {
    let produitPaniers = await ProduitPanier.find()
      .where("user")
      .equals(req.payload.id)
      .populate("annonce");
    res.json(produitPaniers);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// DELETE supprime un produitPanier
exports.deleteFromPanier = async (req, res) => {
  try {
    let { id } = req.params;
    let produit = await ProduitPanier.findById(id);
    if (!produit) {
      return res.status(400).json("l'annonce n'existe pas !");
    }

    if (produit.user != req.payload.id) {
      return res
        .status(401)
        .json(
          "Vous n'avez pas l'autorisation de supprimer cette annonce de ce panier"
        );
    }
    await produit.remove();
    res.json(produit);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
