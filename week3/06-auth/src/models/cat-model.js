import promisePool from '../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(`
    SELECT c.*, u.name AS owner_name
    FROM wsk_cats c
    JOIN wsk_users u ON c.owner = u.user_id
  `);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT * FROM wsk_cats WHERE cat_id = ?`,
    [id]
  );
  return rows[0] || null;
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;

  const [result] = await promisePool.execute(
    `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
     VALUES (?, ?, ?, ?, ?)`,
    [cat_name, weight, owner, filename, birthdate]
  );

  return { cat_id: result.insertId, ...cat };
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(
    `UPDATE wsk_cats SET ? WHERE cat_id = ?`,
    [cat, id]
  );

  const [result] = await promisePool.execute(sql);
  return result.affectedRows ? { message: 'updated' } : null;
};

const removeCat = async (id) => {
  const [result] = await promisePool.execute(
    `DELETE FROM wsk_cats WHERE cat_id = ?`,
    [id]
  );
  return result.affectedRows > 0;
};

export { listAllCats, findCatById, addCat, modifyCat, removeCat };
