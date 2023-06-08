const express = require('express');
const categoryRouter = require('./category.router');

function setRouters(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/categories', categoryRouter);
}



module.exports = setRouters;