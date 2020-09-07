import { AccessTokenState, RequestErrorType } from "./types";

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

export const isRequestErrorOfType = (error: any, errorType: RequestErrorType): boolean => {
  return error instanceof RequestError && error.type === errorType
}
