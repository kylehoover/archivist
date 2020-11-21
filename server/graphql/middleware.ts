import { ArgumentValidationError, MiddlewareFn } from 'type-graphql'
import { ValidationError as JoiValidationError } from 'joi'
import { BaseError, DataIntegrityError, UnknownError, ValidationError } from './errors'

export const errorInterceptor: MiddlewareFn = async (_, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof ArgumentValidationError) {
      throw new ValidationError(err)
    } else if (err instanceof JoiValidationError) {
      throw new DataIntegrityError(err)
    } else if (err instanceof BaseError) {
      throw err
    } else {
      console.log(err)
      throw new UnknownError(err.message || '')
    }
  }
}
