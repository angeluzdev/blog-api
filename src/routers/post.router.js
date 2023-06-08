const express = require('express');
const PostService = require('./../services/post.service');
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

router.get('/:search', async (req, res, next) => {
  try {
    const {search} = req.params;
    const posts = await service.getPostsBySearch(search);
    res.json(posts);
  } catch (error) {
    next(error);
  }
})

router.get('/category/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const posts = await service.getPostsByCategoryId(id);
    res.json(posts);
  } catch (error) {
    next(error);
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const message = await service.insertPost(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const message = await service.deletePost(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;