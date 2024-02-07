const express = require("express");
const router = express.Router();

const controllerUser = require("../controllers/UserController");
const auth = require("../middleware/auth-cookie");

//router.get("/", auth, controllerUser.getMe);

router.post("/signup", controllerUser.signup);

router.post("/login", controllerUser.login);

router.delete("/logout", auth, controllerUser.logout);

router.put("/:id", auth, controllerUser.updateUser);

module.exports = router;
