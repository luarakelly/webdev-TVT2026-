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
import { authenticateToken } from '../middlewares/authentication.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router
  .route('/')
  .get(getCat)
  .post(authenticateToken, upload.single('cat'), createThumbnail, postCat);

router
  .route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default router;
