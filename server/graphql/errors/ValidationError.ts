import { ArgumentValidationError } from 'type-graphql'

import BaseError from './BaseError'

class ValidationError extends BaseError {
  constructor(error: ArgumentValidationError) {
    super('ValidationError', 'Invalid arguments or input', { validationErrors: error.validationErrors })
  }
}

export default ValidationError
