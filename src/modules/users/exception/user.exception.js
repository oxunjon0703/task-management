export class UserNotFoundException extends Error {
  constructor() {
    super("user not found");

    this.statusCode = 404;
  }
}

export class UserLoginAlreadyExistException extends Error {
  constructor() {
    super("user login already exist");

    this.statusCode = 400;
  }
}

export class UserNotCreatedException extends Error {
  constructor() {
    super("user not created");

    this.statusCode = 500;
  }
}

export class UserBadRequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

export class UserNotPasswordException extends Error {
  constructor() {
    super("username or password is incorrect");

    this.statusCode = 400;
  }
}