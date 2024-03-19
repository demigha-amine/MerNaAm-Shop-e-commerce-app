const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set the Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder =
      "./uploads/" + req.originalUrl.replace("/api", "").split("/")[1];
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.parse(file.originalname).ext
    );
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.parse(file.originalname).ext);
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: type du fichier invalide !");
  }
}

// Init Upload
const upload = multer({
  storage: storage,
  // limits:1024,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

module.exports = upload;
