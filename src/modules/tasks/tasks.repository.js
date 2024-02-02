import { Postgres } from "../../lib/pg.js";

export class TaskRepository extends Postgres {
  async getAll() {
    return await this.fetchAll("select * from tasks");
  }

  async getOneById(Id) {
    return await this.fetch("select * from tasks where id = $1", Id);
  }

  async getByCompanyId(Id) {
    return await this.fetch("select * from tasks where company_id = $1", Id);
  }

  async create(dto) {
    return await this.fetch(
      "insert into tasks(title, description, company_id, parent_id, day) VALUES($1, $2, $3, $4, $5) RETURNING *",
      dto.title,
      dto.description,
      dto.company_id,
      dto.parent_id,
      dto.day
    );
  }

  async update(dto) {
    return await this.fetch(
      "UPDATE tasks SET title = $1, description = $2, company_id = $3, parent_id = $4, day = $5 WHERE id = $6 RETURNING *",
      dto.title,
      dto.description,
      dto.companyId,
      dto.parent_id,
      dto.day,
      dto.id
    );
  }

  async delete(Id) {
    return await this.fetch("DELETE from tasks where id = $1", Id);
  }
}
