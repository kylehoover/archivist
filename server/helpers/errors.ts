export class DataIntegrityError extends Error {
  constructor(message: string) {
    super(`Data Integrity Error: ${message}`)
  }
}
