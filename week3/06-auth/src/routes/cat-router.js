import express from 'express';
import { upload, createThumbnail } from '../middlewares/upload.js';
import {
  getCat,
  getCatById,
  getCatByUser,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const router = express.Router();

router.get('/', getCat);
router.get('/user/:id', getCatByUser);
router.get('/:id', getCatById);
router.post('/', upload.single('cat'), createThumbnail, postCat);
router.put('/:id', authenticateToken, putCat);
router.delete('/:id', authenticateToken, deleteCat);

export default router;
