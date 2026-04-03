import { addCat, findCatById, listAllCats } from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);

  const newCat = addCat({
    ...req.body,
    filename: req.file ? req.file.filename : null,
  });

  res.status(201).json(newCat);
};

const putCat = (req, res) => {
  res.sendStatus(200);
};

const deleteCat = (req, res) => {
  res.sendStatus(200);
};

export { getCat, getCatById, postCat, putCat, deleteCat };
