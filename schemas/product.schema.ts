import Joi from "joi";

const id = Joi.string().alphanum().min(3).max(15);

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { getProductSchema };
