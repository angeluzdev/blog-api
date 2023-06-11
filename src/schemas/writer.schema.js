const Joi = require('joi');

const schemaId = Joi.object({
  id: Joi.number().integer()
});

const schemaBody = Joi.object({
  writer: {
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string().max(150),
    location: Joi.string(),
    education: Joi.string().max(30),
    work: Joi.string().max(30)
  },
  user: {
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
    username: Joi.string().max(20).required(),
    role: Joi.string()
  }
})

module.exports = {schemaBody, schemaId};

