const Annonce = require("../models/Annonce");
const fs = require("fs/promises");
const sharp = require("sharp");
sharp.cache(false);

// POST ( Créer une nouvelle annonce )
exports.createAnnonce = async (req, res) => {
  try {
    // resize -> delete old pic -> rename the new pic
    const urlPhoto = `uploads/annonce/${req.file.filename}`;
    const tmp = `uploads/annonce/resized-${req.file.filename}`;
    await sharp(urlPhoto).resize(500, 500).toFile(tmp);
    await fs.unlink(urlPhoto);
    await fs.rename(tmp, urlPhoto);

    req.body.user = req.payload.id;
    req.body.photoAnnonce = urlPhoto;
    let annonce = await Annonce.create(req.body);
    res.status(201).json(annonce);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

// GET pour récuperer toutes les annonces du site
exports.getAnnonces = async (req, res) => {
  try {
    const { name, category, page } = req.query;
    const perPage = 9;

    let filtre = {};
    if (name) {
      filtre = { ...filtre, nomProduit: new RegExp("^" + name, "i") };
    }

    if (category) {
      filtre = { ...filtre, categorie: new RegExp("^" + category, "i") };
    }

    let annonces = await Annonce.find(filtre)
      .limit(perPage)
      .skip(perPage * (page - 1));

    let nbrPages = await Annonce.countDocuments(filtre);
    nbrPages = Math.ceil(nbrPages / perPage);

    res.json({ annonces, nbrPages });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET pour récuperer une seul annonce avec son id
exports.getAnnonce = async (req, res) => {
  try {
    let { id } = req.params;
    let annonce = await Annonce.findById(id);

    if (!annonce) {
      return res.status(400).json("l'annonce n'existe pas !");
    }

    res.json(annonce);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// DELETE pour supprimer une annonce avec son id
exports.deleteAnnonce = async (req, res) => {
  try {
    let { id } = req.params;
    let annonce = await Annonce.findById(id);
    if (!annonce) {
      return res.status(400).json("l'annonce n'existe pas !");
    }

    if (annonce.user != req.payload.id) {
      return res
        .status(401)
        .json("Vous n'avez pas l'autorisation de supprimer cette annonce");
    }

    await annonce.remove();
    await fs.unlink(annonce.photoAnnonce);
    res.json(annonce);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// PUT pour mettre à jours une annonce avec son id
exports.updateAnnonce = async (req, res) => {
  try {
    let { id } = req.params;
    let annonce = await Annonce.findById(id);
    if (!annonce) {
      return res.status(400).json("l'annonce n'existe pas !");
    }

    if (annonce.user != req.payload.id) {
      return res
        .status(401)
        .json("Vous n'avez pas l'autorisation de supprimer cette annonce");
    }

    annonce.nomProduit = req.body.nomProduit;
    annonce.prix = req.body.prix;
    annonce.description = req.body.description;
    annonce.qteDispo = req.body.qteDispo;
    annonce.categorie = req.body.categorie;
    if (req.file) {
      // delete old annonce pic -> resize -> delete old pic -> rename the new pic
      await fs.unlink(annonce.photoAnnonce);
      const urlPhoto = `uploads/annonce/${req.file.filename}`;
      const tmp = `uploads/annonce/resized-${req.file.filename}`;
      await sharp(urlPhoto).resize(500, 500).toFile(tmp);
      await fs.unlink(urlPhoto);
      await fs.rename(tmp, urlPhoto);
      annonce.photoAnnonce = urlPhoto;
    }
    await annonce.save();
    res.json(annonce);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET pour récuperer les annonces de l'utilisateur connecté
exports.getAnnonceUser = async (req, res) => {
  try {
    let annonces = await Annonce.find({ user: req.payload.id }).sort(
      "-updatedAt"
    );
    res.json(annonces);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
