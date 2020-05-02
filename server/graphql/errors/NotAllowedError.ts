import BaseError from './BaseError'

/**
 * Indicates that an endpoint is not currently available due to application settings. Additional
 * authorization will not affect one's ability to access this endpoint.
 */
class NotAllowedError extends BaseError {
  constructor() {
    super('notAllowed', 'This endpoint is not allowed to be accessed at this time')
  }
}

export default NotAllowedError
