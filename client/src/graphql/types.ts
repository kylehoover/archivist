import {
  AgeInfo,
  AlignmentInfo,
  AsiInfo,
  LanguagesInfo,
  MightBeSystemRecord,
  PermissionName,
  RacialTrait,
  SizeInfo,
  SpeedInfo,
} from "../models";
import { Race, RacePreview } from "../races";

// Request / Response Types //

export enum AccessTokenState {
  Expired = "expired",
  Invalid = "invalid",
  NotPresent = "notPresent",
  Valid = "valid",
}

export type GraphQLVariables = Record<string, any>;

export enum RequestErrorType {
  InvalidCredentials = "invalidCredentials",
  Unauthorized = "unauthorized",
  Unknown = "unknown",
  Validation = "validation",
}

export interface Response<T> {
  data: T | null;
  errors: ServerError[];
  hasError: boolean;
}

export interface ServerError {
  accessTokenState?: AccessTokenState;
  message?: string;
  type: ServerErrorType;
}

export enum ServerErrorType {
  InvalidCredentials = "invalidCredentials",
  Unauthorized = "unauthorized",
  Unknown = "unknown",
  Validation = "validation",
}

// Model Types //

export interface ModelType {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface CampaignType extends ModelType {
  name: string;
}

export interface LoginUserType {
  accessToken: string;
  user: UserType;
}

export interface PermissionType {
  name: PermissionName;
  value: boolean;
}

export interface RefreshTokensType {
  accessToken: string;
}

export interface RaceType extends ModelType, MightBeSystemRecord {
  name: string;
  description: string;
  asiInfo: AsiInfo;
  ageInfo: AgeInfo;
  alignmentInfo: AlignmentInfo;
  sizeInfo: SizeInfo;
  speedInfo: SpeedInfo;
  languagesInfo: LanguagesInfo;
  traits: RacialTrait[];
  parentRaceId: string;
  subraceIds: string[];
  userId: string;
  version: string;
}

export interface UserType extends ModelType {
  email: string;
  name: string;
  permissions: PermissionType[];
}

// Input Types //

export interface AddCampaignInputType {
  name: string;
}

export interface LoginUserInputType {
  email: string;
  password: string;
}

// GraphQL Data Types //

export interface AddCampaignData {
  addCampaign: CampaignType;
}

export interface GetCampaignData {
  campaign: CampaignType | null;
}

export interface GetCampaignsData {
  campaigns: CampaignType[];
}

export interface GetCurrentUserData {
  currentUser: UserType;
}

export interface GetRacesData {
  races: Race[];
}

export interface GetUsersData {
  users: UserType[];
}

export interface LoginUserData {
  loginUser: LoginUserType;
}

export interface RefreshTokensData {
  refreshTokens: RefreshTokensType;
}
