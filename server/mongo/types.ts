export enum CollectionName {
  AppSettings = 'appSettings',
  Campaigns = 'campaigns',
  Races = 'races',
  UserRegistrationInvitations = 'userRegistrationInvitations',
  UserRegistrationRequests = 'UserRegistrationRequests',
  UserRoles = 'userRoles',
  Users = 'users',
}

export interface MongoDocument {
  [key: string]: any
}

export interface UpdateOperations {
  $set?: MongoDocument
  $unset?: {
    [key: string]: ''
  }
}
