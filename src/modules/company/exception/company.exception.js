export class CompanyNotFoundException extends Error {
  constructor() {
    super("Company not found");

    this.statusCode = 404;
  }
}

export class CompanyNotFoundMyIdException extends Error {
  constructor() {
    super("Your company does not exist");

    this.statusCode = 404;
  }
}

export class CompanyException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

export class CompanyExistsException extends Error {
  constructor() {
    super("this Company exists");

    this.statusCode = 404;
  }
}
