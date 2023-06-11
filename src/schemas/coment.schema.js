const Joi = require('joi');

const schemaId = Joi.object({
  id: Joi.number().integer().min(1).required()
});

const schemabody = Joi.object({
  content: Joi.string().min(1).required(),
  user_id: Joi.number().integer().min(1).required(),
  post_id: Joi.number().integer().min(1).required()
});

module.exports = {schemaId, schemabody};