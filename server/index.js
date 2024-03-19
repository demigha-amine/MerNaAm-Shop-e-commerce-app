require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

// ----------------------- Database config -----------------------

require("./config/database");

// -----------------------      Route      -----------------------

app.use("/api/user", require("./routes/RouteUser"));
app.use("/api/annonce", require("./routes/RouteAnnonce"));
app.use("/api/panier", require("./routes/RouteProduitPanier"));
app.use("/api/commande", require("./routes/RouteCommande"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// -----------------------      Hébergement      -----------------------

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
