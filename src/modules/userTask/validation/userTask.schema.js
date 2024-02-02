import Joi from "joi";
import { status } from "../../../common/enums/roles.js";

const statusArray = Object.values(status);

export const UserTaskSchema = Joi.object({
  userId: Joi.number().required(),
  taskId: Joi.number().required(),
  startAt: Joi.date().required(),
  endAt: Joi.date().required(),
  startedDate: Joi.date(),
  endedDate: Joi.date(),
  status: Joi.string().valid(...statusArray),
});
