import multer from 'multer';
import sharp from 'sharp';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

const createThumbnail = async (req, res, next) => {
  try {
    if (!req.file) {
      next();
      return;
    }
    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname);
    const name = path.basename(req.file.filename, ext);
    const thumbPath = `uploads/${name}_thumb.png`;

    await sharp(filePath).resize(160, 160).png().toFile(thumbPath);
    console.log('Thumbnail created:', thumbPath);
    next();
  } catch (err) {
    next(err);
  }
};

export { upload, createThumbnail };
