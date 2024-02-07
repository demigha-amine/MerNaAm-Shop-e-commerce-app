const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token = req.cookies.token.split(" ")[1];
    jwt.verify(token, "83c78c58637bcd70fa99c895b87b2d6e3f23bdabf14e6db307c16d0335ee5526", (err, payload) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      else {
        req.payload = payload;
        next();
      }
    });
  } catch (err) {
    res.json({ message: "auth not send" });
  }
};
