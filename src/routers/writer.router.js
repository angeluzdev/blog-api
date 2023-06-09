const express = require('express');
const WriterService = require('./../services/writer.service');
const service = new WriterService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const writers = await service.getWriters();
    res.json(writers);
  } catch (error) {
    next(error);    
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const writer = await service.getWriterById(id);
    res.json(writer)
  } catch (error) {
    next(error);
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const message = await service.insertWriter(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const message = await service.deleteWriter(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.patch('/update/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const message = await service.updateWriter(req.body, id);
    res.json(message);
  } catch (error) {
    next(error);    
  }
})

module.exports = router;