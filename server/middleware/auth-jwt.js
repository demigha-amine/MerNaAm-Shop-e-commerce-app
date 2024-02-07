const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "83c78c58637bcd70fa99c895b87b2d6e3f23bdabf14e6db307c16d0335ee5526", function (err, payload) {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        req.payload = payload;
        next();
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "veuillez envoyer le header authorization" });
  }
};
