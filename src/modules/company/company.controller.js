import { ResData } from "../../common/resData.js";
import {
  CompanyException,
  CompanyExistsException,
  CompanyNotFoundException,
  CompanyNotFoundMyIdException,
} from "./exception/company.exception.js";
import { CompanySchema } from "./validation/company.schema.js";

export class CompanyController {
  #companyService;
  constructor(companyService) {
    this.#companyService = companyService;
  }

  async getAll(req, res) {
    try {
      const resData = await this.#companyService.getAll();

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async getMyId(req, res) {
    try {
      const companyId = req.currentUser;
      const Id = req.params?.id;

      if (companyId.role == "superAdmin") {
        const resData = await this.#companyService.getById(Id);

        res.status(resData.statusCode).json(resData);
      } else if (companyId.company_id == Id) {
        const resData = await this.#companyService.getMyId(Id);

        res.status(resData.statusCode).json(resData);
      } else if (companyId.company_id !== Id) {
        const resData = await this.#companyService.getMyId(
          companyId.company_id
        );

        res.status(resData.statusCode).json(resData);
      } else {
        throw new CompanyNotFoundMyIdException();
      }
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async create(req, res) {
    try {
      const dto = req.body;

      const validated = CompanySchema.validate(dto);

      if (validated.error) {
        throw new CompanyException(validated.error.message);
      }

      const checkName = await this.#companyService.getOneByName(dto.name);

      if (checkName) {
        throw new CompanyExistsException();
      }

      const resData = await this.#companyService.create(dto);

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

      const validated = CompanySchema.validate(dto);

      if (validated.error) {
        throw new CompanyException(validated.error.message);
      }

      const { data: checkCompany } = await this.#companyService.getById(Id);

      if (!checkCompany) {
        throw new CompanyNotFoundException();
      }

      const checkName = await this.#companyService.getOneByName(dto.name);

      if (checkName) {
        throw new CompanyExistsException();
      }

      const resData = await this.#companyService.update(dto, Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async delete(req, res) {
    try {
      const Id = req.params?.id;

      const resData = await this.#companyService.delete(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }
}
