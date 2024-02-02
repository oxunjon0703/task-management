import { Postgres } from "../../lib/pg.js";

export class UserRepository extends Postgres {
  async getAll() {
    return await this.fetchAll("SELECT * FROM users");
  }

  async getByLogin(login) {
    return await this.fetch("SELECT * FROM users WHERE login = $1 ", login);
  }

  async getById(id) {
    return await this.fetch("SELECT * FROM users WHERE id = $1 ", id);
  }

  async getMyAll(id) {
    return await this.fetchAll(
      "SELECT * FROM users WHERE company_id = $1 ",
      id
    );
  }

  async create(dto) {
    return await this.fetch(
      "INSERT INTO users (login, password, full_name, company_id, role) VALUES ($1, $2, $3, $4, $5) RETURNING * ",
      dto.login,
      dto.password,
      dto.full_name,
      dto.company_id,
      dto.role
    );
  }

  async update(dto) {
    return await this.fetch(
      "UPDATE users SET login = $1, password = $2, full_name = $3, company_id = $4, role = $5 WHERE id = $6 RETURNING * ",
      dto.login,
      dto.password,
      dto.full_name,
      dto.company_id,
      dto.role,
      dto.id
    );
  }

  async delete(id) {
    return await this.fetch("DELETE FROM users WHERE id = $1 ", id);
  }
}
