import { ArgumentValidationError, MiddlewareFn } from 'type-graphql'

import { ValidationError } from './errors'

export const errorInterceptor: MiddlewareFn = async (_, next) => {
  try {
    return await next()
  } catch (err) {
    if (err instanceof ArgumentValidationError) {
      throw new ValidationError(err)
    }

    throw err
  }
}
