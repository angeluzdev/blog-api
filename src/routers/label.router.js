const express = require('express');
const LabelService = require('./../services/labels.service');
const validateData = require('./../middlewares/data.handler');
const { schemaBody, schemaId } = require('./../schemas/labels.schema');
const service = new LabelService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const labels = await service.getLabels();
    res.json(labels); 
  } catch (error) {
    next(error);
  }
})

router.post('/add', validateData('body', schemaBody) ,async (req, res, next) => {
  try {
    const message = await service.insertLabel(req.body);
    res.json(message);    
  } catch (error) {
    next(error)
  }
})

router.delete('/delete/:id', validateData('params', schemaId) ,async (req, res, next) => {
  try {
    const {id} = req.params;
    const message = await service.deleteLabel(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;