import BaseError from './BaseError'

/**
 * This error is used when a user attempts to register with an email that is already being used.
 */
class EmailAlreadyInUseError extends BaseError {
  constructor() {
    super('emailAlreadyInUse', 'The email provided is already being used by another user')
  }
}

export default EmailAlreadyInUseError
