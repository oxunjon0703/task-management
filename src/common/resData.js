export class ResData {
  constructor(message, statusCode, data = null, error = null) {
    (this.message = message),
      (this.statusCode = statusCode),
      (this.data = data),
      (this.error = error);
  }

  set setMessage(message) {
    this.message = message;
  }

  set setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }
}
