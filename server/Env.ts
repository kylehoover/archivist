import dotenv from 'dotenv'
import { Container, Service } from 'typedi'

export function getEnv(): Env {
  return Container.get(Env)
}

@Service()
class Env {
  private jwtSecret: string
  private mongoDbName: string
  private mongoUri: string
  private port: number
  private saltRounds: number

  constructor() {
    dotenv.config()
    this.jwtSecret = this.loadEnvVar('AR_JWT_SECRET')
    this.mongoDbName = this.loadEnvVar('AR_MONGO_DB_NAME')
    this.mongoUri = this.loadEnvVar('AR_MONGO_URI')
    this.port = this.loadEnvVarAsNumber('AR_PORT')
    this.saltRounds = this.loadEnvVarAsNumber('AR_SALT_ROUNDS')
  }

  public get JwtSecret(): string {
    return this.jwtSecret
  }

  public get MongoDbName(): string {
    return this.mongoDbName
  }

  public get MongoUri(): string {
    return this.mongoUri
  }

  public get Port(): number {
    return this.port
  }

  public get SaltRounds(): number {
    return this.saltRounds
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
