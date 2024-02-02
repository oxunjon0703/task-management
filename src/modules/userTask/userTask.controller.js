import { ResData } from "../../common/resData.js";
import { TaskNotFoundException } from "../tasks/exception/tasks.exception.js";
import { UserNotFoundException } from "../users/exception/user.exception.js";
import {
  UserTaskException,
  UserTaskNotFoundException,
} from "./exception/userTask.exception.js";
import { UserTaskSchema } from "./validation/userTask.schema.js";

export class UserTaskController {
  #userTaskService;
  #userService;
  #taskService;
  constructor(userTaskService, userService, taskService) {
    this.#userTaskService = userTaskService;
    this.#userService = userService;
    this.#taskService = taskService;
  }

  async create(req, res) {
    try {
      const dto = req.body;

      const validated = UserTaskSchema.validate(dto);

      if (validated.error) {
        throw new UserTaskException(validated.error.message);
      }

      const { data: checkUser } = await this.#userService.getById(dto.userId);

      if (!checkUser) {
        throw new UserNotFoundException();
      }

      const { data: checkTask } = await this.#taskService.getOneById(
        dto.taskId
      );

      if (!checkTask) {
        throw new TaskNotFoundException();
      }

      const resData = await this.#userTaskService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(400).json(resData);
    }
  }

  async update(req, res) {
    try {
      const Id = Number(req.params?.id);
      const dto = req.body;

      const validated = UserTaskSchema.validate(dto);

      if (validated.error) {
        throw new UserTaskException(validated.error.message);
      }

      const { data: checkUserTask } = await this.#userTaskService.getOneById(
        Id
      );

      if (!checkUserTask) {
        throw new UserTaskNotFoundException();
      }

      const { data: checkUser } = await this.#userService.getById(dto.userId);


      if (!checkUser) {
        throw new UserNotFoundException();
      }

      const { data: checkTask } = await this.#taskService.getOneById(
        dto.taskId
      );

      if (!checkTask) {
        throw new TaskNotFoundException();
      }

      const resData = await this.#userTaskService.update(dto, Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(400).json(resData);
    }
  }

  async delete(req, res) {
    try {
      const Id = req.params?.id;

      const resData = await this.#userTaskService.delete(Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(400).json(resData);
    }
  }

  async getByTaskId(req, res) {
    try {
      const taskId = req.params?.id;

      const { data: checkTaskId } = await this.#userTaskService.getTaskId(
        taskId
      );

      if (!checkTaskId) {
        throw new UserTaskNotFoundException();
      }

      const resData = await this.#userTaskService.getByTaskId(taskId);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(400).json(resData);
    }
  }

  async getByUserId(req, res) {
    try {
      const userId = req.params?.id;

      const { data: checkUserId } = await this.#userTaskService.getUserId(
        userId
      );

      if (!checkUserId) {
        throw new UserTaskNotFoundException();
      }

      const resData = await this.#userTaskService.getByUserId(userId);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(400).json(resData);
    }
  }

  async getOneById(req, res) {
    try {
      const Id = req.params?.id;

      const resData = await this.#userTaskService.getOneById(Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(400).json(resData);
    }
  }
}
