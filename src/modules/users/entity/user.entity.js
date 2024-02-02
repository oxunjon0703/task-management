export class UserEntity {
  constructor(dto) {
    this.login = dto.login;
    this.password = dto.password;
    this.full_name = dto.fullName;
    this.company_id = dto.companyId;
    this.role = dto.role;
  }
}
