const express = require('express');
const Auth = require('./../services/auth.service');
const { isNotAuthenticate, isAuthenticate } = require('./../middlewares/auth.handler');
const service = new Auth();
const router = express.Router();

router.post('/signin', isNotAuthenticate,async (req,res,next) => {
  try {
    const data = await service.signinUser(req.body);
    res.cookie('token_session', data.token, {httpOnly: true});
    res.json(data);
  } catch (error) {
    next(error);
  }
})

router.post('/signup', isNotAuthenticate,async (req,res,next) => {
  try {
    const data = await service.registerUser(req.body);
    res.cookie('token_session', data.token, {httpOnly:true});
    res.json(data);
  } catch (error) {
    next(error);
  }
})

router.get('/logout', isAuthenticate,async (req, res, next) => {
  try {
    res.clearCookie('token_session');
    res.sendStatus(200);
  } catch (error) {
    
  }
})

module.exports = router;