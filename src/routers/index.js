const express = require('express');
const categoryRouter = require('./category.router');
const labelRouter = require('./label.router');
const postRouter = require('./post.router');
const writerRouter = require('./writer.router');
const comentRouter = require('./coment.router');

function setRouters(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/categories', categoryRouter);
  router.use('/labels', labelRouter);
  router.use('/posts', postRouter);
  router.use('/writers', writerRouter);
  router.use('/coments', comentRouter);
}



module.exports = setRouters;