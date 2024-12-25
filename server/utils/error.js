class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "AuthError";
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "CustomError";
  }
}

export { AuthError, NotFoundError, CustomError };
