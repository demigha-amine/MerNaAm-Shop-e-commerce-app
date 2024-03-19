const express = require("express");
const router = express.Router();

const CommandeController = require("../controllers/CommandeController");
const auth = require("../middleware/auth-cookie");

router.get("/", auth, CommandeController.getCommandesUser);
router.post("/checkout", auth, CommandeController.checkout);
router.post("/refund", auth, CommandeController.refund);
router.post("/webhook", CommandeController.hooks);

module.exports = router;
