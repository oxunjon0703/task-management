import { ResData } from "../../common/resData.js";
import { CompanyNotFoundException } from "../company/exception/company.exception.js";
import {
  UserBadRequestException,
  UserLoginAlreadyExistException,
  UserNotFoundException,
} from "./exception/user.exception.js";
import {
  userRegisterSchema,
  UserLoginSchema,
} from "./validation/user.schema.js";

export class UserController {
  #userService;
  #companyService;
  #userTaskService;
  constructor(userService, companyService, userTaskService) {
    this.#userService = userService;
    this.#companyService = companyService;
    this.#userTaskService = userTaskService;
  }

  async getAll(req, res) {
    try {
      const checkUser = req.currentUser;
      const companyId = Number(req.query.companyId);

      if (checkUser.role == "superAdmin" && !companyId) {
        const resData = await this.#userService.getAll();

        res.status(resData.statusCode).json(resData);
      } else if (checkUser.role == "superAdmin") {
        const resData = await this.#userService.getMyAll(companyId);

        res.status(resData.statusCode).json(resData);
      } else if (checkUser.company_id == companyId) {
        const resData = await this.#userService.getMyAll(companyId);

        res.status(resData.statusCode).json(resData);
      } else if (checkUser.company_id !== companyId) {
        const resData = await this.#userService.getMyAll(checkUser.company_id);

        res.status(resData.statusCode).json(resData);
      } else {
        throw new UserNotFoundException();
      }
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const checkUser = req.currentUser;
      const Id = req.params?.id;

      if (checkUser.role == "superAdmin") {
        const resData = await this.#userService.getById(Id);

        res.status(resData.statusCode).json(resData);
      } else if (checkUser.id == Id) {
        const resData = await this.#userService.getById(Id);

        res.status(resData.statusCode).json(resData);
      } else if (checkUser.id !== Id) {
        const resData = await this.#userService.getById(checkUser.id);

        res.status(resData.statusCode).json(resData);
      }
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);
      res.status(400).json(resData);
    }
  }

  async register(req, res) {
    try {
      const dto = req.body;
      const checkRole = req.currentUser;

      if (checkRole.role !== "superAdmin") {
        dto.companyId = checkRole.company_id;
      }

      const validate = userRegisterSchema.validate(dto);

      if (validate.error) {
        throw new UserBadRequestException(validate.error.message);
      }

      const checkLogin = await this.#userService.getByLogin(dto.login);

      if (checkLogin.data) {
        throw new UserLoginAlreadyExistException();
      }

      if (dto.companyId) {
        const checkCompany = await this.#companyService.getById(dto.companyId);

        if (!checkCompany) {
          throw new CompanyNotFoundException();
        }
      }

      const resData = await this.#userService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async login(req, res) {
    try {
      const dto = req.body;

      const validated = UserLoginSchema.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.login(dto);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);
      res.status(400).json(resData);
    }
  }

  async update(req, res) {
    try {
      const dto = req.body;
      const Id = req.params?.id;
      const checkRole = req.currentUser;

      if (checkRole.role !== "superAdmin") {
        dto.companyId = checkRole.company_id;
      }

      const validate = userRegisterSchema.validate(dto);

      if (validate.error) {
        throw new UserBadRequestException(validate.error.message);
      }

      const { data: checkUser } = await this.#userService.getById(Id);

      if (!checkUser) {
        throw new UserNotFoundException();
      }

      const checkLogin = await this.#userService.getByLogin(dto.login);

      if (checkLogin.data) {
        throw new UserLoginAlreadyExistException();
      }

      if (dto.companyId) {
        const checkCompany = await this.#companyService.getById(dto.companyId);

        if (!checkCompany) {
          throw new CompanyNotFoundException();
        }
      }

      const resData = await this.#userService.update(dto, Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async delete(req, res) {
    try {
      const Id = req.params?.id;

      const deleteUserTask = await this.#userTaskService.deleteUserId(Id);

      const resData = await this.#userService.delete(Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);
      res.status(400).json(resData);
    }
  }
}
