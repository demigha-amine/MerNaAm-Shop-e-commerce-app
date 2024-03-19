const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token = req.cookies.token.split(" ")[1];
    jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
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
