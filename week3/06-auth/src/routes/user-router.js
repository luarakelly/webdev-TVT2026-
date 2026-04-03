import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  removeUser,
} from '../controllers/user-controller.js';

const router = express.Router();

router.route('/').get(getUser).post(postUser);

router
  .route('/:id')
  .get(getUserById)
  .put(putUser)
  .delete(removeUser);

export default router;
