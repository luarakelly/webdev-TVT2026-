import express from 'express';
import { body } from 'express-validator';
import { getUser, getUserById, postUser, putUser, removeUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { validationErrors } from '../middlewares/error-handlers.js';

const router = express.Router();

router.route('/')
  .get(getUser)
  .post(
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 8 }),
    body('role').trim().notEmpty().withMessage('Role is required'),
    validationErrors,
    postUser
  );

router.route('/:id')
  .get(getUserById)
  .put(
    authenticateToken,
    body('name').optional().trim().notEmpty(),
    body('email').optional().trim().isEmail(),
    body('password').optional().trim().isLength({ min: 8 }),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, removeUser);

export default router;
