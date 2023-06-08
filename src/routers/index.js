const express = require('express');
const categoryRouter = require('./category.router');
const labelRouter = require('./label.router');
const postRouter = require('./post.router');

function setRouters(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/categories', categoryRouter);
  router.use('/labels', labelRouter);
  router.use('/posts', postRouter);
}



module.exports = setRouters;