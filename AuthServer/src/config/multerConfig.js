const multer = require("multer");
const path = require("path");
// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/images/users")); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Set the filename for uploaded files
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Set file size limit (in bytes)
});

module.exports = upload;
