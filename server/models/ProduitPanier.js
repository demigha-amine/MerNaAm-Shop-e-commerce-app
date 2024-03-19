const mongoose = require("mongoose");

const produitPanierSchema = new mongoose.Schema({
  annonce: { type: mongoose.Schema.Types.ObjectId, ref: "Annonce" },
  qteAchat: { type: Number, default: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bought: { type: Boolean, default: false },
});

const ProduitPanier = mongoose.model("ProduitPanier", produitPanierSchema);
module.exports = ProduitPanier;
