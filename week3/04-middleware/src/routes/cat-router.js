import express from 'express';
import multer from 'multer';
import { createThumbnail } from '../middlewares/upload.js';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const router = express.Router();

// configure multer
const upload = multer({ dest: 'uploads/' });

// routes
router
  .route('/')
  .get(getCat)
  .post(upload.single('cat'), createThumbnail, postCat);

router
  .route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat);

export default router;
