const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = model("contact", contactSchema);

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

const schemas = {
  add: schemaAdd,
  edit: schemaPut,
  updateFavorite: schemaFavorite,
};

module.exports = {
  schemas,
  Contact,
};