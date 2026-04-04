import {
  listAllCats,
  findCatById,
  getCatsByUser,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (err) {
    next(err);
  }
};

const getCatById = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
    if (cat) res.json(cat);
    else next({ status: 404, message: 'Cat not found' });
  } catch (err) {
    next(err);
  }
};

const getCatByUser = async (req, res, next) => {
  try {
    const cats = await getCatsByUser(req.params.id);
    res.json(cats);
  } catch (err) {
    next(err);
  }
};

const postCat = async (req, res, next) => {
  try {
    const newCat = await addCat({
      ...req.body,
      filename: req.file ? req.file.filename : null,
    });
    res.status(201).json(newCat);
  } catch (err) {
    next(err);
  }
};

const putCat = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) return next({ status: 404, message: 'Cat not found' });

    if (res.locals.user.role !== 'admin' && cat.owner !== res.locals.user.user_id) {
      return next({ status: 403, message: 'Forbidden' });
    }

    const result = await modifyCat(req.body, req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) return next({ status: 404, message: 'Cat not found' });

    if (res.locals.user.role !== 'admin' && cat.owner !== res.locals.user.user_id) {
      return next({ status: 403, message: 'Forbidden' });
    }

    const result = await removeCat(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export { getCat, getCatById, getCatByUser, postCat, putCat, deleteCat };
