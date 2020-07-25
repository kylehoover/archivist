import dotenv from 'dotenv'
import { Container, Service } from 'typedi'

export function getEnv(): Env {
  return Container.get(Env)
}

@Service()
class Env {
  private accessTokenExpirationTime: string
  private jwtSecret: string
  private mongoDbName: string
  private mongoUri: string
  private port: number
  private refreshTokenExpirationTime: string
  private rootPath: string
  private saltRounds: number

  constructor() {
    dotenv.config()
    this.accessTokenExpirationTime = this.loadEnvVar('AR_ACCESS_TOKEN_EXPIRATION_TIME')
    this.jwtSecret = this.loadEnvVar('AR_JWT_SECRET')
    this.mongoDbName = this.loadEnvVar('AR_MONGO_DB_NAME')
    this.mongoUri = this.loadEnvVar('AR_MONGO_URI')
    this.port = this.loadEnvVarAsNumber('AR_PORT')
    this.refreshTokenExpirationTime = this.loadEnvVar('AR_REFRESH_TOKEN_EXPIRATION_TIME')
    this.rootPath = this.loadEnvVar('AR_ROOT_PATH')
    this.saltRounds = this.loadEnvVarAsNumber('AR_SALT_ROUNDS')
  }

  public get AccessTokenExpirationTime(): string {
    return this.accessTokenExpirationTime
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

  public get RefreshTokenExpirationTime(): string {
    return this.refreshTokenExpirationTime
  }

  public get RootPath(): string {
    return this.rootPath
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
