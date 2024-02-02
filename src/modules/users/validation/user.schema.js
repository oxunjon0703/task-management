import Joi from "joi";
import { roles } from "../../../common/enums/roles.js";

const rolesArray = Object.values(roles);

const role = rolesArray.shift()

export const userRegisterSchema = Joi.object({
  login: Joi.string().max(32).min(4).required(),
  password: Joi.string().max(32).min(4).required(),
  fullName: Joi.string().max(32).min(4).required(),
  companyId: Joi.number().min(0).required(),
  role: Joi.string()
    .valid(...rolesArray)
    .required(),
});

export const UserLoginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});
