import { AccessTokenState, RequestErrorType, Response } from "./types";

export class AuthenticationRequiredError extends Error {
  constructor() {
    super('The user tried to perform a request that required authentication. The user should ' + 
      'authenticate themselves before attempting the request again.')
  }
}

export class RequestError extends Error {
  constructor(
    public readonly type: RequestErrorType,
    public readonly message: string,
    public readonly accessTokenState: AccessTokenState,
  ) {
    super(message)
  }
}
