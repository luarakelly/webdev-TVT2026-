import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  deleteUser,
} from '../models/user-model.js';

const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) res.json(user);
    else res.sendStatus(404);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postUser = async (req, res) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putUser = async (req, res) => {
  try {
    const result = await modifyUser(req.body, req.params.id);
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getUser, getUserById, postUser, putUser, removeUser };
