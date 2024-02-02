import { Postgres } from "../../lib/pg.js";

export class UserTaskRepository extends Postgres {
  async getByTaskId(id) {
    return await this.fetchAll(`select ut.id, ut.start_at, ut.end_at, ut.status,
    (select jsonb_agg(row_to_json(u)) from users u where u.id = ut.user_id) as users,
    (select json_agg((row_to_json(t))) from tasks t where t.id = ut.task_id) as tasks
    from user_tasks ut where ut.task_id = $1`, id);
  }

  async getByUserId(id) {
    return await this.fetchAll(`select ut.id, ut.start_at, ut.end_at, ut.status,
    (select jsonb_agg(row_to_json(u)) from users u where u.id = ut.user_id) as users,
    (select json_agg((row_to_json(t))) from tasks t where t.id = ut.task_id) as tasks
    from user_tasks ut where ut.user_id = $1;`, id)
  }

  async getTaskId(id) {
    return await this.fetch("select * from user_tasks ut where ut.task_id = $1", id);
  }

  async getUserId(id) {
    return await this.fetch("select * from user_tasks ut where ut.user_id = $1", id);
  }

  async getOneById(id) {
    return await this.fetch("select * from user_tasks where id = $1", id);
  }

  async create(dto) {
    return await this.fetch(
      "INSERT INTO user_tasks(user_id, task_id, start_at, end_at, started_date, ended_date, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      dto.user_id,
      dto.task_id,
      dto.start_at,
      dto.end_at,
      dto.started_date,
      dto.ended_date,
      dto.status  || 'took',
    );
  }

  async update(dto) {
    return await this.fetch(
      "UPDATE user_tasks SET user_id = $1, task_id = $2, start_at = $3, end_at = $4, started_date = $5, ended_date = $6, status = $7 WHERE id = $8 RETURNING *",
      dto.userId,
      dto.taskId,
      dto.startAt,
      dto.endAt,
      dto.started_date,
      dto.ended_date,
      dto.status || 'took',
      dto.id
    );
  }

  async delete(id) {
    return await this.fetch("DELETE FROM user_tasks WHERE id = $1;", id);
  }

  async deleteUserId(id) {
    return await this.fetch("DELETE FROM user_tasks WHERE user_id = $1;", id);
  }

  async deleteTaskId(id) {
    return await this.fetch("DELETE FROM user_tasks WHERE task_id = $1;", id);
  }
}
