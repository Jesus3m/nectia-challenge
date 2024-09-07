export class BaseError extends Error {
  constructor(message: string, public code = 500, public metadata = {}) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
