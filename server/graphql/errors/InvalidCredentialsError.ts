import { BaseError } from './BaseError'

/**
 * The credentials provided by the user could not be validated. This error will not indicate which
 * credentials were invalid.
 */
export class InvalidCredentialsError extends BaseError {
  constructor() {
    super('invalidCredentials', 'The credentials provided are not valid')
  }
}
