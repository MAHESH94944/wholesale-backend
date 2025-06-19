const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/svg+xml"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only .png, .jpg, .jpeg, .webp, .gif, and .svg format allowed!"
        )
      );
    }
  },
});

module.exports = upload;