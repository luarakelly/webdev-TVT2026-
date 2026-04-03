import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  deleteUser,
} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const router = express.Router();

router.route('/').get(getUser).post(postUser);

router
  .route('/:id')
  .get(getUserById)
  .delete(authenticateToken, deleteUser);

export default router;
