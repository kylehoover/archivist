import BaseError from './BaseError'
import { AccessTokenState } from '../../helpers/auth'

class UnauthorizedError extends BaseError {
  constructor(accessTokenState: AccessTokenState) {
    super('UnauthorizedError', 'User is not authorized to access this endpoint', { accessTokenState })
  }
}

export default UnauthorizedError
