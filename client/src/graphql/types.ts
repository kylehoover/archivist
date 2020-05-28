// Request / Response Types //

export enum AccessTokenState {
  Expired = 'expired',
  Invalid = 'invalid',
  NotPresent = 'notPresent',
  Valid = 'valid',
}

export type GraphQLVariables = Record<string, any>

export type Response<T> = {
  data: T | null
  errors: ServerError[]
  hasError: boolean
}

export type ServerError = {
  accessTokenState?: AccessTokenState
  message?: string
  type: ServerErrorType
}

export enum ServerErrorType {
  InvalidCredentials = 'invalidCredentials',
  Unauthorized = 'unauthorized',
  Unknown = 'unknown',
  Validation = 'validation',
}

// Model Types //

interface ModelType {
  id: string
  createdAt: Date
  modifiedAt: Date
}

interface PermissionType {
  name: string
  value: boolean
}

export interface UserType extends ModelType {
  email: string
  name: string
  permissions: PermissionType[]
}

// Response Data Types //

export type RefreshTokensResponse = {
  refreshTokens: {
    accessToken: string
  }
}

export type UsersResponse = {
  users: UserType[]
}
