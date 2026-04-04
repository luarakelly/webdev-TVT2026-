import express from 'express';
import { body } from 'express-validator';
import { getCat, getCatById, getCatByUser, postCat, putCat, deleteCat } from '../controllers/cat-controller.js';
import { upload, createThumbnail } from '../middlewares/upload.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { validationErrors } from '../middlewares/error-handlers.js';

const router = express.Router();

router.get('/', getCat);
router.get('/user/:id', getCatByUser);
router.get('/:id', getCatById);

router.post(
  '/',
  authenticateToken,
  upload.single('file'),
  body('cat_name').trim().isLength({ min: 3, max: 50 }),
  body('weight').isFloat({ min: 0 }),
  body('owner').isInt(),
  body('birthdate').isDate(),
  validationErrors,
  createThumbnail,
  postCat
);

router.put('/:id', authenticateToken, putCat);
router.delete('/:id', authenticateToken, deleteCat);

export default router;
