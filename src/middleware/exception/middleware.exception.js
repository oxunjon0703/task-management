export class AuthorizationTokenRequiredException extends Error {
  constructor() {
    super("token must be required");

    this.statusCode = 401;
  }
}
export class AuthorizationUserIdRequiredException extends Error {
  constructor() {
    super("userId must be required");

    this.statusCode = 401;
  }
}
export class ForbidenAdminRoleException extends Error {
  constructor() {
    super("Forbidden admin role");

    this.statusCode = 403;
  }
}