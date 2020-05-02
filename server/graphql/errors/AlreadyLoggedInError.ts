import BaseError from './BaseError'

/**
 * Indicates an endpoint that should only be accessed when a user is not logged in.
 */
class AlreadyLoggedInError extends BaseError {
  constructor() {
    super('alreadyLoggedIn', 'This endpoint cannot be accessed when the user is already logged in')
  }
}

export default AlreadyLoggedInError
