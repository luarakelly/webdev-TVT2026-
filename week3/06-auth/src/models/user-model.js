import promisePool from '../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  return rows[0] || null;
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  return rows[0] || null;
};

const addUser = async (user) => {
  const { name, username, email, role, password } = user;

  const [result] = await promisePool.execute(
    `INSERT INTO wsk_users (name, username, email, role, password)
     VALUES (?, ?, ?, ?, ?)`,
    [name, username, email, role, password]
  );

  return { user_id: result.insertId, ...user };
};

const deleteUserById = async (id) => {
  const [result] = await promisePool.execute(
    'DELETE FROM wsk_users WHERE user_id = ?',
    [id]
  );
  return result.affectedRows > 0;
};

export {
  listAllUsers,
  findUserById,
  findUserByUsername,
  addUser,
  deleteUserById,
};
