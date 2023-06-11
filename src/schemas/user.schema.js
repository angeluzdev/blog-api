const Joi = require('joi');

const schemaId = Joi.object({
  id: Joi.number().integer().min(1).required()
});

const schemaBody = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  username: Joi.string().max(20).required(),
  role: Joi.string()
});

const schemaBodyPostFavorite = Joi.object({
  post_id: Joi.number().integer().min(1).required(),
  user_id: Joi.number().integer().min(1).required()
});

module.exports = {schemaBody, schemaId, schemaBodyPostFavorite};
