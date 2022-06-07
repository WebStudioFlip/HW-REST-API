const Joi = require("joi");

const schemaAdd = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
  });
  
  const schemaPut = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  }).or('name', 'email', 'phone');

  const schemaFavorite = Joi.object({
    favorite: Joi.boolean().required(),
  });

  module.exports = {
    add: schemaAdd,
    edit: schemaPut,
    updateFavorite: schemaFavorite,
  };