import express from 'express';
import {
  getCat,
  getCatById,
  getCatByUser,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const router = express.Router();

router.get('/', getCat);
router.get('/:id', getCatById);
router.get('/user/:id', getCatByUser);
router.post('/', postCat);
router.put('/:id', putCat);
router.delete('/:id', deleteCat);

export default router;
