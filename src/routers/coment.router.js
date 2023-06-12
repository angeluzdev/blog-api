const express = require('express');
const Coment = require('./../services/coment.service');
const validateData = require('./../middlewares/data.handler');
const { schemaId, schemabody } = require('./../schemas/coment.schema');
const { isAuthenticate } = require('./../middlewares/auth.handler');
const service = new Coment();
const router = express.Router();

router.get('/:id', validateData('params', schemaId),async (req,res,next) => {
  try {
    const {id} = req.params;
    const coments = await service.getComentsByPostId(id);
    res.json(coments);
  } catch (error) {
    next(error);
  }
})

router.post('/add', isAuthenticate, validateData('body', schemabody),async (req, res, next) => {
  try {
    const message = await service.insertComent(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', isAuthenticate, validateData('params',schemaId),async (req, res, next) => {
  try {
    const {id} = req.params;
    const message = await service.deleteComent(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;