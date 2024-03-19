const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema(
  {
    nomProduit: { type: String, required: true },
    prix: { type: Number, required: true },
    description: { type: String, required: true },
    photoAnnonce: { type: String, required: true },
    qteDispo: { type: Number, default: 1 },
    categorie: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Annonce = mongoose.model("Annonce", annonceSchema);
module.exports = Annonce;
