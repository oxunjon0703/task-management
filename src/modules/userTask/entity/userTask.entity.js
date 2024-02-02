export class UserTaskEntity {
  constructor(dto) {
    this.user_id = dto.userId;
    this.task_id = dto.taskId;
    this.start_at = dto.startAt;
    this.end_at = dto.endAt;
    this.started_date = dto.startedDate;
    this.ended_date = dto.endedDate;
    this.status = dto.status;
  }
}
