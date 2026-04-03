import bcrypt from 'bcrypt';
import {
  listAllUsers,
  findUserById,
  addUser,
  deleteUserById,
} from '../models/user-model.js';

const getUser = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) return res.sendStatus(404);
  res.json(user);
};

const postUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const loggedUser = res.locals.user;

    // 🔥 AUTHORIZATION
    if (
      loggedUser.role !== 'admin' &&
      loggedUser.user_id != req.params.id
    ) {
      return res.sendStatus(403);
    }

    const success = await deleteUserById(req.params.id);
    if (!success) return res.sendStatus(404);

    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
};

export { getUser, getUserById, postUser, deleteUser };
