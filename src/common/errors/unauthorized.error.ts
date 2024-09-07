import { BaseError } from ".";

export class Unauthorized extends BaseError {
  constructor(message: string) {
    super(message, 401);
  }
}
