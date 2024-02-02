import { ResData } from "../../common/resData.js";
import { CompanyRepository } from "./company.repository.js";
import {
  CompanyNotFoundException,
  CompanyNotFoundMyIdException,
} from "./exception/company.exception.js";
import { CompanyEntity } from "./entity/company.entity.js";

export class CompanyService {
  #repository;
  constructor() {
    this.#repository = new CompanyRepository();
  }

  async getAll() {
    const companys = await this.#repository.getAll();

    const resData = new ResData("get all companys", 200, companys);

    return resData;
  }

  async getMyId(Id) {
    const companyId = await this.#repository.getOneMyId(Id);

    if (!companyId) {
      throw new CompanyNotFoundMyIdException();
    }

    const resData = new ResData("get my company", 200, companyId);

    return resData;
  }

  async create(dto) {
    const newcompany = new CompanyEntity(dto);

    const companys = await this.#repository.create(newcompany);

    const resData = new ResData("company created", 201, companys);

    return resData;
  }

  async update(dto, Id) {
    const data = { ...dto, id: Id };

    const updateCompany = await this.#repository.update(data);

    const resData = new ResData("updated company by id", 201, updateCompany);

    return resData;
  }

  async delete(Id) {
    const companyId = await this.#repository.getById(Id);

    if (!companyId) {
      throw new CompanyNotFoundException();
    }

    const deleteCompany = await this.#repository.delete(Id);

    const resData = new ResData("deleted Id", 200, companyId);

    return resData;
  }

  async getOneByName(name) {
    const companyName = await this.#repository.getOneByName(name);

    return companyName;
  }

  async getById(id) {
    const companyId = await this.#repository.getById(id);

    if (!companyId) {
      throw new CompanyNotFoundException();
    }

    const resData = new ResData("get by id company", 200, companyId);

    return resData;
  }
}
