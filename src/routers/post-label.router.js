const express = require('express');
const LabelPost = require('./../services/post-label.service');
const service = new LabelPost();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const labels = await service.getPostLabels();
    res.json(labels);
  } catch (error) {
    next(error);
  }
});


module.exports = router;