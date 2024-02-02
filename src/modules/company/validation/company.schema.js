import Joi from "joi";

export const CompanySchema = Joi.object({
  name: Joi.string().required(),
});
