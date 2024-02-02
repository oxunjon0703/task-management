import Joi from "joi";

export const TaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  companyId: Joi.number().required(),
  parentId: Joi.number(),
  day: Joi.date().required(),
});
