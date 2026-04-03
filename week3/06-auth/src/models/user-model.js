import promisePool from '../utils/database.js';

// Get all users
const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

// Get user by ID
const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  return rows.length ? rows[0] : false;
};

// Add user
const addUser = async (user) => {
  const { name, username, email, role, password } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password)
               VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [name, username, email, role, password]);
  return { user_id: result.insertId, ...user };
};

// Delete user and their cats
const deleteUser = async (userId) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    // Delete all cats belonging to this user
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [userId]);

    // Delete the user
    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [userId]
    );

    await connection.commit();

    return result.affectedRows ? { message: 'success' } : false;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

export { listAllUsers, findUserById, addUser, deleteUser };

