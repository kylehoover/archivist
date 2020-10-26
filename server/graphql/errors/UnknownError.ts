import { BaseError } from './BaseError'

/**
 * Any error that is not defined in this directory is considered an unknown GraphQL error.
 */
export class UnknownError extends BaseError {
  constructor(message: string) {
    super('unknown', `An unkown error has occurred on the server. Original message: ${message}`)
  }
}
