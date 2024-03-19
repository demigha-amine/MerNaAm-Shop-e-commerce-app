const mongoose = require("mongoose");

const commandeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ProduitPanier",
      },
    ],
    shippingDetails: {
      address: {
        line1: { type: String, default: "" },
        city: { type: String, default: "" },
        postal_code: { type: String, default: "" },
        country: { type: String, default: "" },
      },
      phone: { type: String, default: "" },
      name: { type: String, default: "" },
      email: { type: String, default: "" },
    },
    status: { type: String, required: true },
    payment_intent: { type: String, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Commande = mongoose.model("Commande", commandeSchema);

module.exports = Commande;
