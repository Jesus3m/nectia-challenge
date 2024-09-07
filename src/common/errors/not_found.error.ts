import { BaseError } from ".";

export class NotFound extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}
