const Joi = require('joi');

const schemaId = Joi.object({
  id: Joi.number().integer().min(1).required()
})

const schemaBody = Joi.object({
  name_category: Joi.string().pattern(/^[a-zA-Z]+$/).max(30).required()
})

module.exports = {schemaId, schemaBody};