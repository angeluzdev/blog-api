const Joi = require('joi');

const schemaId = Joi.object({
  id: Joi.number().integer().min(1).required()
});

const schemaBody = Joi.object({
  title: Joi.string().max(50).required(),
  content: Joi.string().required(),
  writer_id: Joi.number().integer().min(1).required(),
  category_id: Joi.number().integer().min(1).required(),
  likes: Joi.number().integer().min(0),
  views: Joi.number().integer().min(0)
})

const schemaSearch = Joi.object({
  search: Joi.string().required()
})

const schemaLabelBody = Joi.object({
  post_id: Joi.number().integer().required(),
  label_id: Joi.number().integer().required()
})

const schemaDeleteLabel = Joi.object({
  id: Joi.number().integer().min(1).required(),
  idPost: Joi.number().integer().min(1).required()
})

module.exports = {schemaBody, schemaId, schemaLabelBody, schemaSearch, schemaDeleteLabel};