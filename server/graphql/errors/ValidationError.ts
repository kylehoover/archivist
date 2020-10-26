import { ArgumentValidationError } from 'type-graphql'
import { BaseError } from './BaseError'

/**
 * The arguments or input provided by the user failed to be validated. This is a wrapper for
 * ArgumentValidationError.
 */
export class ValidationError extends BaseError {
  constructor(error: ArgumentValidationError) {
    super('validation', 'Invalid arguments or input', { validationErrors: error.validationErrors })
  }
}
