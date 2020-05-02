import BaseError from './BaseError'
import { AccessTokenState } from '../../helpers/auth'

/**
 * Indicates that a user does not have sufficient authorization to access an endpoint. Additional
 * authorization may affect the user's access.
 */
class UnauthorizedError extends BaseError {
  constructor(accessTokenState: AccessTokenState) {
    super('unauthorized', 'User is not authorized to access this endpoint', { accessTokenState })
  }
}

export default UnauthorizedError
