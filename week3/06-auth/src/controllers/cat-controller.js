import {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (!cat) return res.sendStatus(404);
  res.json(cat);
};

const postCat = async (req, res) => {
  try {
    const user = res.locals.user;

    const newCat = await addCat({
      ...req.body,
      owner: user.user_id, // 🔥 enforce owner from token
      filename: req.file ? req.file.filename : null,
    });

    res.status(201).json(newCat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create cat' });
  }
};

const putCat = async (req, res) => {
  try {
    const user = res.locals.user;
    const cat = await findCatById(req.params.id);

    if (!cat) return res.sendStatus(404);

    // 🔥 AUTHORIZATION
    if (user.role !== 'admin' && cat.owner !== user.user_id) {
      return res.sendStatus(403);
    }

    const updated = await modifyCat(req.body, req.params.id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
};

const deleteCat = async (req, res) => {
  try {
    const user = res.locals.user;
    const cat = await findCatById(req.params.id);

    if (!cat) return res.sendStatus(404);

    // 🔥 AUTHORIZATION
    if (user.role !== 'admin' && cat.owner !== user.user_id) {
      return res.sendStatus(403);
    }

    await removeCat(req.params.id);
    res.json({ message: 'Cat deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
};

export { getCat, getCatById, postCat, putCat, deleteCat };
