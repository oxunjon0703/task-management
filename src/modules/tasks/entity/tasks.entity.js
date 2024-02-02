export class TaskEntity {
  constructor(dto) {
    this.title = dto.title;
    this.description = dto.description;
    this.company_id = dto.companyId;
    this.parent_id = dto.parentId;
    this.day = dto.day;
  }
}
