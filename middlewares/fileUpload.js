const multer = require("multer");
const path = require("path");

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../static/uploads");
    cb(null, uploadPath); // Save files in static/uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter,
});

module.exports = upload;



// const express = require("express");
// const upload = require("../middlewares/fileUpload");

// const router = express.Router();

// // Single file upload
// router.post("/upload", upload.single("file"), (req, res) => {
//   if (req.file) {
//     res.json({ message: "File uploaded successfully", file: req.file });
//   } else {
//     res.status(400).json({ message: "No file uploaded" });
//   }
// });

// // Multiple file uploads
// router.post("/uploads", upload.array("files", 5), (req, res) => {
//   if (req.files && req.files.length > 0) {
//     res.json({ message: "Files uploaded successfully", files: req.files });
//   } else {
//     res.status(400).json({ message: "No files uploaded" });
//   }
// });

// module.exports = router;
