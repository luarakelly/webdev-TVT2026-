import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  removeUser,
} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const router = express.Router();

router.route('/').get(getUser).post(postUser);

router.route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, removeUser);

export default router;
