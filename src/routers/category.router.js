const express = require('express');
const router= express.Router();
const CategoryService = require('./../services/categories.service');
const service = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
})

router.post('/add', async (req,res,next) => {
  try {
    const message = await service.insertCategory(req.body);
    res.json(message);
  } catch (error) {
    next(error)
  }
})

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const message = await service.deleteCategory(id);

    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;