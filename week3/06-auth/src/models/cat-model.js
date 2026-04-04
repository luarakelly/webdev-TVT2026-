import promisePool from '../utils/database.js';

// Get all cats + owner name
const listAllCats = async () => {
  const [rows] = await promisePool.query(`
    SELECT wsk_cats.*, wsk_users.username AS owner_name
    FROM wsk_cats
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
  `);
  return rows;
};

// Get cat by id
const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  return rows.length ? rows[0] : false;
};

// Get cats by user
const getCatsByUser = async (userId) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [userId]
  );
  return rows;
};

// Add cat
const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;

  const [result] = await promisePool.execute(
    `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
     VALUES (?, ?, ?, ?, ?)`,
    [cat_name, weight, owner, filename, birthdate]
  );

  return {cat_id: result.insertId};
};

// Update cat
const modifyCat = async (cat, id) => {
  const sql = promisePool.format(
    `UPDATE wsk_cats SET ? WHERE cat_id = ?`,
    [cat, id]
  );

  const [result] = await promisePool.execute(sql);

  return result.affectedRows ? {message: 'success'} : false;
};

// Delete cat
const removeCat = async (id) => {
  const [result] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id]
  );

  return result.affectedRows ? {message: 'success'} : false;
};

export {
  listAllCats,
  findCatById,
  getCatsByUser,
  addCat,
  modifyCat,
  removeCat,
};
