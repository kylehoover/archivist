import { ArgumentValidationError, MiddlewareFn } from 'type-graphql'

import { BaseError, UnknownError, ValidationError } from './errors'

export const errorInterceptor: MiddlewareFn = async (_, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof ArgumentValidationError) {
      throw new ValidationError(err)
    } else if (err instanceof BaseError) {
      throw err
    } else {
      throw new UnknownError(err.message || '')
    }
  }
}
