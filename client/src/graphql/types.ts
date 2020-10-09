import { PermissionName } from '../models'

// Request / Response Types //

export enum AccessTokenState {
  Expired = 'expired',
  Invalid = 'invalid',
  NotPresent = 'notPresent',
  Valid = 'valid',
}

export type GraphQLVariables = Record<string, any>

export enum RequestErrorType {
  InvalidCredentials = 'invalidCredentials',
  Unauthorized = 'unauthorized',
  Unknown = 'unknown',
  Validation = 'validation',
}

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

export interface ModelType {
  id: string
  createdAt: Date
  modifiedAt: Date
}

export interface CampaignType extends ModelType {
  name: string
}

export interface LoginUserType {
  accessToken: string
  user: UserType
}

export interface PermissionType {
  name: PermissionName
  value: boolean
}

export interface RefreshTokensType {
  accessToken: string
}

export interface UserType extends ModelType {
  email: string
  name: string
  permissions: PermissionType[]
}

// Input Types //

export interface AddCampaignInputType {
  name: string
}

export type LoginUserInputType = {
  email: string
  password: string
}

// GraphQL Data Types //

export type AddCampaignData = {
  addCampaign: CampaignType
}

export type GetCampaignsData = {
  campaigns: CampaignType[]
}

export type GetCurrentUserData = {
  currentUser: UserType
}

export type GetUsersData = {
  users: UserType[]
}

export type LoginUserData = {
  loginUser: LoginUserType
}

export type RefreshTokensData = {
  refreshTokens: RefreshTokensType
}
