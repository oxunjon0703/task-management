import { ResData } from "../../common/resData.js";
import { TaskNotFoundException } from "./exception/tasks.exception.js";
import { TaskRepository } from "./tasks.repository.js";
import { TaskEntity } from "./entity/tasks.entity.js";

export class TaskService {
  #repository;
  constructor() {
    this.#repository = new TaskRepository();
  }

  async getByCompanyId(id) {
    const taskId = await this.#repository.getByCompanyId(id);

    if (!taskId) {
      throw new TaskNotFoundException();
    }

    const resData = new ResData("Get by companyId task", 200, taskId);

    return resData;
  }

  async getOneById(id) {
    const task = await this.#repository.getOneById(id);

    if (!task) {
      throw new TaskNotFoundException();
    }

    const resData = new ResData("Get one by id task", 200, task);

    return resData;
  }

  async create(dto) {
    const newtask = new TaskEntity(dto);

    const task = await this.#repository.create(newtask);

    const resData = new ResData("Success", 201, task);

    return resData;
  }

  async update(dto, id) {
    const taskId = await this.#repository.getOneById(id);

    if (!taskId) {
      throw new TaskNotFoundException();
    }

    const data = { ...dto, id: id };

    const updatedtask = await this.#repository.update(data);

    const resData = new ResData("updated bi id task", 200, updatedtask);

    return resData;
  }

  async delete(id) {
    const taskId = await this.#repository.getOneById(id);
    
    if (!taskId) {
      throw new TaskNotFoundException();
    }

    const deletetask = await this.#repository.delete(id);

    const resData = new ResData("delete task", 200, taskId);

    return resData;
  }
}
