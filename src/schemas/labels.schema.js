const Joi = require('joi');

const schemaId = Joi.object({
  id: Joi.number().integer().min(1).required()
})

const schemaBody = Joi.object({
  name_label: Joi.string().pattern(/^[a-z]+$/).required()
})

module.exports = { schemaBody, schemaId };