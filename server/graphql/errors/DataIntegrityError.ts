import { BaseError } from './BaseError'
import { ValidationError} from 'joi'

export class DataIntegrityError extends BaseError {
  constructor(error: ValidationError) {
    super('dataIntegrity', error.message)
  }
}
