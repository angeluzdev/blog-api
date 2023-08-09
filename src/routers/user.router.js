const express = require('express');
const User = require('./../services/user.service');
const validateData = require('./../middlewares/data.handler');
const { schemaBodyPostFavorite, schemaId } = require('./../schemas/user.schema');
const { isAuthenticate } = require('./../middlewares/auth.handler');
const passport = require('passport');
const service = new User();
const router = express.Router();

router.get('/',isAuthenticate,async (req, res, next) => {
  try {
    const {sub} = req.user;
    const posts = await service.getPostsByUserId(sub);
    res.json({
      username: req.user.username,
      posts
    });
  } catch (error) {
    next(error);
  }
})

router.get('/likes', isAuthenticate, async(req,res,next) => {
  try {
    const {sub} = req.user;
    const posts = await service.getLikePostsByUserId(sub);
    res.json(posts);
  } catch (error) {
    next(error);
  }
})

router.post('/add', isAuthenticate, validateData('body', schemaBodyPostFavorite), async (req,res,next) => {
  try {
    const data = {user_id: req.user.sub, post_id:req.body.post_id};
    
    const message = await service.insertPostFavorite(data);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.post('/like/add/:id', isAuthenticate, async(req, res, next) => {
  try {
    const data = {user_id: req.user.sub, post_id: req.params.id};
    const message = await service.insertPostLike(data);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', isAuthenticate, validateData('params', schemaId),async (req,res,next) => {
  try {
    const {id} = req.params;
    const data = {
      user_id: req.user.sub,
      post_id: id
    }
    const message = await service.deletePostFavorite(data);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/like/delete/:id', isAuthenticate, validateData('params', schemaId), async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = {
      userId: req.user.sub,
      postId: id
    }
    const message = await service.deleteLikePost(data);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;