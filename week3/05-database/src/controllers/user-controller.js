import {
  listAllUsers,
  findUserById,
  addUser,
  deleteUser,
} from '../models/user-model.js';

// Get all users
const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by id
const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) res.json(user);
    else res.sendStatus(404);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create user
const postUser = async (req, res) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
const putUser = async (req, res) => {
  try {
    res.json({ message: 'User update not implemented yet' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
const removeUser = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getUser, getUserById, postUser, putUser, removeUser };
