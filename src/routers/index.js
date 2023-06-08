const express = require('express');
const categoryRouter = require('./category.router');
const labelRouter = require('./label.router');

function setRouters(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/categories', categoryRouter);
  router.use('/labels', labelRouter);
}



module.exports = setRouters;