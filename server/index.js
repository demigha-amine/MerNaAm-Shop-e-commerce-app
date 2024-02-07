require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

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
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.post("/test", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);

  // apply filter
  // resize

  const result = await uploadFile(file);
  // await unlinkFile(file.path);
  console.log(result);
  //const description = req.body.description;
  res.send({ imagePath: `/images/${result.Key}` });
});

app.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

app.use("/api/user", require("./routes/RouteUser"));
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
