const express = require('express');
const User = require('./../services/user.service');
const validateData = require('./../middlewares/data.handler');
const { schemaBody, schemaBodyPostFavorite, schemaId } = require('./../schemas/user.schema');
const service = new User();
const router = express.Router();

router.get('/:id', validateData('params', schemaId),async (req, res, next) => {
  try {
    const {id} = req.params;
    const posts = await service.getPostsByUserId(id);
    res.json(posts);
  } catch (error) {
    next(error);
  }
})

router.post('/add', validateData('body', schemaBodyPostFavorite),async (req,res,next) => {
  try {
    const message = await service.insertPostFavorite(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', validateData('params', schemaId),async (req,res,next) => {
  try {
    const {id} = req.params;
    const message = await service.deletePostFavorite(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})


module.exports = router;