import { GraphQLError } from 'graphql'

type keyValueMap = {
  [key: string]: any
}

class BaseError extends GraphQLError {
  constructor(type: string, message: string, extensions: keyValueMap = {}) {
    super(message, undefined, undefined, undefined, undefined, undefined, {
      errorType: type,
      ...extensions,
    })
  }
}

export default BaseError
