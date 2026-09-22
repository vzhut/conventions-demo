/**
 * Every domain failure in this service is an AppError — never a raw Error
 * or string thrown across a module boundary. Callers can switch on `code`
 * without parsing message text.
 */
export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode = 400,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super("not_found", message, 404);
  }
}
