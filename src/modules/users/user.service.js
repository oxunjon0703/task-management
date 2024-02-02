import { ResData } from "../../common/resData.js";
import {
  UserNotCreatedException,
  UserNotFoundException,
  UserNotPasswordException,
} from "./exception/user.exception.js";
import { UserRepository } from "./user.repository.js";
import { UserEntity } from "./entity/user.entity.js";
import { hashed, compare } from "./../../lib/bcript.js";
import { generateToken } from "./../../lib/jwt.js";

export class UserService {
  #repository;
  constructor() {
    this.#repository = new UserRepository();
  }

  async getAll() {
    const foundAll = await this.#repository.getAll();

    const resData = new ResData("get all users", 200, foundAll);

    return resData;
  }

  async getById(Id) {
    const userId = await this.#repository.getById(Id);

    if (!userId) {
      throw new UserNotFoundException();
    }

    const resData = new ResData("get by id users", 200, userId);

    return resData;
  }

  async getByMyId(Id) {
    const userId = await this.#repository.getById(Id);

    if (!userId) {
      throw new UserNotFoundException();
    }

    const resData = new ResData("get by my id users", 200, userId);

    return resData;
  }

  async getMyAll(Id) {
    const userId = await this.#repository.getMyAll(Id);

    if (!userId) {
      throw new UserNotFoundException();
    }

    const resData = new ResData("get my id users", 200, userId);

    return resData;
  }

  async getByLogin(login) {
    const foundByLogin = await this.#repository.getByLogin(login);

    let resData;

    if (foundByLogin) {
      resData = new ResData("success login", 200, foundByLogin);
    } else {
      resData = new ResData("user not found", 404, foundByLogin);
    }

    return resData;
  }

  async create(dto) {
    const hashedPassword = await hashed(dto.password);

    dto.password = hashedPassword;

    const newUser = new UserEntity(dto);

    const createdUser = await this.#repository.create(newUser);

    if (!createdUser) {
      throw new UserNotCreatedException();
    }

    const token = generateToken(createdUser.id);

    const resData = new ResData("success created", 201, {
      user: createdUser,
      token: token,
    });

    return resData;
  }

  async login(dto) {
    const { data: foundUser } = await this.getByLogin(dto.login);

    if (!foundUser) {
      throw new UserNotPasswordException();
    }

    const isValidPassword = await compare(dto.password, foundUser.password);

    if (!isValidPassword) {
      throw new UserNotPasswordException();
    }

    const token = generateToken(foundUser.id);

    return new ResData("Success", 200, {
      user: foundUser,
      token: token,
    });
  }

  async update(dto, Id) {
    const hashedPassword = await hashed(dto.password);

    dto.password = hashedPassword;

    const newUser = new UserEntity(dto);

    const updatedUser = await this.#repository.update({ ...newUser, id: Id });

    const resData = new ResData("update by id user", 201, updatedUser);

    return resData;
  }

  async delete(Id) {
    const userId = await this.#repository.getById(Id);

    if (!userId) {
      throw new UserNotFoundException();
    }

    const deleteBrand = await this.#repository.delete(Id);

    const resData = new ResData("deleted Id", 200, userId);

    return resData;
  }
}
