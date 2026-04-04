import {
  listAllCats,
  findCatById,
  getCatsByUser,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

// Get all
const getCat = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

// Get by id
const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (cat) res.json(cat);
    else res.sendStatus(404);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

// Get by user
const getCatByUser = async (req, res) => {
  try {
    const cats = await getCatsByUser(req.params.id);
    res.json(cats);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

// Create
const postCat = async (req, res) => {
  try {
    const newCat = await addCat({
      ...req.body,
      filename: req.file ? req.file.filename : null,
    });
    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

// Update
const putCat = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) return res.sendStatus(404);

    // only owner or admin can update
    if (res.locals.user.role !== 'admin' && cat.owner !== res.locals.user.user_id) {
      return res.sendStatus(403);
    }

    const result = await modifyCat(req.body, req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
const deleteCat = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) return res.sendStatus(404);

    // only owner or admin can delete
    if (res.locals.user.role !== 'admin' && cat.owner !== res.locals.user.user_id) {
      return res.sendStatus(403);
    }

    const result = await removeCat(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getCat,
  getCatById,
  getCatByUser,
  postCat,
  putCat,
  deleteCat,
};
