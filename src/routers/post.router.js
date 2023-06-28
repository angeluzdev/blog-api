const express = require('express');
const PostService = require('./../services/post.service');
const validateData = require('./../middlewares/data.handler');
const { schemaBody, schemaId, schemaLabelBody, schemaSearch,schemaDeleteLabel } = require('./../schemas/post.schema');
const service = new PostService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await service.getPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
})

router.get('/favorites', async (req,res, next) => {
  try {
    let posts = await service.getPosts();
    posts = posts.sort((a,b) => b.likes - a.likes);
    res.json(posts.slice(0,2));
  } catch (error) {
    next(error);
  }
})

router.get('/:id', validateData('params', schemaId),async (req,res,next) => {
  try {
    const {id} = req.params;
    const post = await service.getPostById(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
})

router.get('/labels/:id', validateData('params', schemaId),async(req, res, next) => {
  try {
    const {id} = req.params;
    const labelsPost = await service.getLabelsByPostId(id);
    res.json(labelsPost);
  } catch (error) {
    next(error);
  }
})

router.get('/search/:search', validateData('params',schemaSearch),async (req, res, next) => {
  try {
    const {search} = req.params;
    const posts = await service.getPostsBySearch(search);
    res.json(posts);
  } catch (error) {
    next(error);
  }
})

router.get('/category/:id', validateData('params', schemaId),async (req, res, next) => {
  try {
    const {id} = req.params;
    const posts = await service.getPostsByCategoryId(id);
    res.json(posts);
  } catch (error) {
    next(error);
  }
})

router.post('/add', validateData('body', schemaBody),async (req, res, next) => {
  try {
    const message = await service.insertPost(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.post('/labels/add', validateData('body', schemaLabelBody),async (req, res, next) => {
  try {
    const message = await service.insertPostLabels(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', validateData('params', schemaId),async (req, res, next) => {
  try {
    const {id} = req.params;
    const message = await service.deletePost(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/label/delete', validateData('body', schemaDeleteLabel),async (req, res, next) => {
  try {
    const {id, idPost} = req.body;
    const message = await service.deleteLabelOfPostById(id, idPost);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.patch('/view/:id', async (req, res, next) => {
  const {id} = req.params;
  await service.setViewsOfPost(id);
  res.sendStatus(200);
})

module.exports = router;