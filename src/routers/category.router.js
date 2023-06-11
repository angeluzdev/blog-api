const express = require('express');
const router= express.Router();
const CategoryService = require('./../services/categories.service');
const service = new CategoryService();
const validateData = require('./../middlewares/data.handler');
const { schemaBody, schemaId } = require('./../schemas/category.schema');

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
})

router.post('/add', validateData('body', schemaBody),async (req,res,next) => {
  try {
    const message = await service.insertCategory(req.body);
    res.json(message);
  } catch (error) {
    next(error)
  }
})

router.delete('/delete/:id', validateData('params', schemaId),async (req, res, next) => {
  try {
    const {id} = req.params;
    const message = await service.deleteCategory(id);

    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;