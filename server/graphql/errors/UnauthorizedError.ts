import { AccessTokenState } from '../../helpers/auth'
import { BaseError } from './BaseError'

/**
 * Indicates that a user does not have sufficient authorization to access an endpoint. Additional
 * authorization may affect the user's access.
 */
export class UnauthorizedError extends BaseError {
  constructor(accessTokenState: AccessTokenState) {
    super('unauthorized', 'User is not authorized to access this endpoint', { accessTokenState })
  }
}
