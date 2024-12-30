import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());

  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Image only");
  }
}

const upload = multer({
  storage,
});
router.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    // Normalize path to use forward slashes
    const imagePath = req.file.path.replace(/\\/g, "/");
    res.json({
      message: "Image Uploaded",
      image: "/" + imagePath,
    });
    console.log(imagePath);
  } else {
    res.status(400).json({ message: "No file uploaded" });
  }
});
export default router;
