import dotenv from 'dotenv'
import { Container, Service } from 'typedi'

export function getEnv(): Env {
  return Container.get(Env)
}

@Service()
class Env {
  private _mongoDbName: string
  private _mongoUri: string
  private _port: number
  private _saltRounds: number

  constructor() {
    dotenv.config()
    this._mongoDbName = this.loadEnvVar('AR_MONGO_DB_NAME')
    this._mongoUri = this.loadEnvVar('AR_MONGO_URI')
    this._port = this.loadEnvVarAsNumber('AR_PORT')
    this._saltRounds = this.loadEnvVarAsNumber('AR_SALT_ROUNDS')
  }

  public get mongoDbName(): string {
    return this._mongoDbName
  }

  public get mongoUri(): string {
    return this._mongoUri
  }

  public get port(): number {
    return this._port
  }

  public get saltRounds(): number {
    return this._saltRounds
  }

  private loadEnvVar(name: string): string {
    const value = process.env[name]

    if (value === undefined) {
      throw new Error(`${name} environment variable is not set`)
    }

    return value
  }

  private loadEnvVarAsNumber(name: string): number {
    const value = parseInt(this.loadEnvVar(name))

    if (isNaN(value)) {
      throw new Error(`${name} environment variable is not a valid number`)
    }

    return value
  }
}

export default Env
