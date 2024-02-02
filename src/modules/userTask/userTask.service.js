import { ResData } from "../../common/resData.js";
import { UserTaskEntity } from "./entity/userTask.entity.js";
import { UserTaskNotFoundException } from "./exception/userTask.exception.js";
import { UserTaskRepository } from "./userTask.repository.js";

export class UserTaskService {
  #repository;
  constructor() {
    this.#repository = new UserTaskRepository();
  }

  async create(dto) {
    const newUserTask = new UserTaskEntity(dto);

    const UserTask = await this.#repository.create(newUserTask);

    const resData = new ResData("Success", 201, UserTask);

    return resData;
  }

  async update(dto, Id) {
    const data = { ...dto, id: Id };

    const updatedUserTask = await this.#repository.update(data);

    const resData = new ResData("updated by id", 200, updatedUserTask);

    return resData;
  }

  async delete(id) {
    const UserTaskId = await this.#repository.getOneById(id);

    if (!UserTaskId) {
      throw new UserTaskNotFoundException();
    }

    const deletedUserTask = await this.#repository.delete(id);

    const resData = new ResData("deleted by id user Task", 200, UserTaskId);

    return resData;
  }

  async getByTaskId(id) {
    const UserTasks = await this.#repository.getByTaskId(id);

    const resData = new ResData("get by task id user Task", 200, UserTasks);

    return resData;
  }

  async getByUserId(id) {
    const UserTasks = await this.#repository.getByUserId(id);

    const resData = new ResData("get by user id user Task", 200, UserTasks);

    return resData;
  }

  async getOneById(id) {
    const UserTaskId = await this.#repository.getOneById(id);

    if (!UserTaskId) {
      throw new UserTaskNotFoundException();
    }

    const resData = new ResData("get by id user Task", 200, UserTaskId);

    return resData;
  }

  async getTaskId(id) {
    const TaskId = await this.#repository.getTaskId(id);

    if (!TaskId) {
      throw new UserTaskNotFoundException();
    }

    const resData = new ResData("get by task id user Task", 200, TaskId);

    return resData;
  }

  async getUserId(id) {
    const UserId = await this.#repository.getUserId(id);

    if (!UserId) {
      throw new UserTaskNotFoundException();
    }

    const resData = new ResData("get by user id user Task", 200, UserId);

    return resData;
  }

  async deleteUserId(id) {
    const UserId = await this.#repository.getUserId(id);

    if (UserId) {
      const deletedUserTask = await this.#repository.deleteUserId(id);
    }

    return UserId;
  }

  async deleteTaskId(id) {
    const TaskId = await this.#repository.getTaskId(id);

    if (TaskId) {
      const deletedUserTask = await this.#repository.deleteTaskId(id);
    }

    return TaskId;
  }
}
