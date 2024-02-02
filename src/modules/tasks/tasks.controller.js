import { ResData } from "../../common/resData.js";
import { CompanyNotFoundException } from "../company/exception/company.exception.js";
import {
  TaskException,
  TaskNotFoundException,
} from "./exception/tasks.exception.js";
import { TaskSchema } from "./validation/tasks.schema.js";

export class TaskController {
  #taskService;
  #companyService;
  #userTaskService
  constructor(taskService, companyService, userTaskService) {
    this.#taskService = taskService;
    this.#companyService = companyService;
    this.#userTaskService = userTaskService;
  }

  async getByCompanyId(req, res) {
    try {
      const companyId = Number(req.query.companyId);
      const checkRole = req.currentUser;

      if (checkRole.role == "superAdmin") {
        const resData = await this.#taskService.getByCompanyId(companyId);

        res.status(resData.statusCode).json(resData);
      } else if (checkRole.company_id == companyId) {
        const resData = await this.#taskService.getByCompanyId(companyId);

        res.status(resData.statusCode).json(resData);
      } else if (checkRole.company_id !== companyId) {
        const resData = await this.#taskService.getByCompanyId(
          checkRole.company_id
        );

        res.status(resData.statusCode).json(resData);
      } else {
        throw new TaskNotFoundException();
      }
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async getOneById(req, res) {
    try {
      const Id = Number(req.params?.id);

      const resData = await this.#taskService.getOneById(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async create(req, res) {
    try {
      const dto = req.body;      
      const checkRole = req.currentUser;

      if (checkRole.role !== "superAdmin") {
        dto.companyId = checkRole.company_id;
      }

      const validated = TaskSchema.validate(dto);

      if (validated.error) {
        throw new TaskException(validated.error.message);
      }

      const checkCompany = await this.#companyService.getById(dto.companyId);

      if (!checkCompany) {
        throw new CompanyNotFoundException();
      }

      const resData = await this.#taskService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async update(req, res) {
    try {
      const Id = Number(req.params?.id);
      const dto = req.body;
      const checkRole = req.currentUser;

      if (checkRole.role !== "superAdmin") {
        dto.companyId = checkRole.company_id;
      }

      const validated = TaskSchema.validate(dto);

      if (validated.error) {
        throw new TaskException(validated.error.message);
      }
      
      const {data: checkCompany} = await this.#companyService.getById(dto.companyId);

      if (!checkCompany) {
        throw new CompanyNotFoundException();
      }

      const resData = await this.#taskService.update(dto, Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async delete(req, res) {
    try {
      const Id = req.params.id;

      const deleteUserTask = await this.#userTaskService.deleteTaskId(Id)

      const resData = await this.#taskService.delete(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }
}
