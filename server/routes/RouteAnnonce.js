const express = require("express");
const router = express.Router();

const annonceController = require("../controllers/AnnonceController");
const auth = require("../middleware/auth-cookie");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, annonceController.createAnnonce);
router.get("/", annonceController.getAnnonces);
router.get("/getAnnonceUser", auth, annonceController.getAnnonceUser);

router.get("/:id", annonceController.getAnnonce);
router.delete("/:id", auth, annonceController.deleteAnnonce);
router.put("/:id", auth, multer, annonceController.updateAnnonce);

module.exports = router;
