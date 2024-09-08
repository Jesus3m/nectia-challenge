export enum AuthorizationError {
  UNAUTHORIZED = "unauthorized",
  INVALID_TOKEN = "invalid_token",
  INVALID_CREDENTIALS = "invalid_credentials",
  USER_EXISTS = "user_exists",
}

export enum ResourceErrors {
  NOT_FOUND = "not_found",
  BAD_REQUEST = "bad_request",
  CREATING_ERROR = "error_creating",
}
