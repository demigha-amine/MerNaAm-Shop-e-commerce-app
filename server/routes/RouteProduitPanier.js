const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth-cookie");

const ProduitPanierController = require("../controllers/ProduitPanierController");

router.post("/", auth, ProduitPanierController.addToPanier);
router.get("/getPanierUser", auth, ProduitPanierController.getPanierUser);
router.delete("/:id", auth, ProduitPanierController.deleteFromPanier);

module.exports = router;
