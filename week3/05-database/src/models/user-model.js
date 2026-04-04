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
  return rows.length ? rows[0] : false;
};

const addUser = async (user) => {
  const { name, username, email, role, password } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [name, username, email, role, password]);
  return { user_id: result.insertId, ...user };
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(
    `UPDATE wsk_users SET ? WHERE user_id = ?`,
    [user, id]
  );
  const [result] = await promisePool.execute(sql);
  return result.affectedRows ? { message: 'success' } : false;
};

const deleteUser = async (userId) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [userId]);
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

export { listAllUsers, findUserById, addUser, modifyUser, deleteUser };
