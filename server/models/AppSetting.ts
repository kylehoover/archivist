import { DateFields, Model, ModelFields, ModifiedAt } from './Model'
import { AppSettingType } from '../graphql/types'

export enum AppSettingName {
  NumDaysInvitationIsValid = 'numDaysInvitationIsValid',
  UserRegistrationState = 'userRegistrationState',
}

export enum RegistrationState {
  ByRequest = 'byRequest',
  Closed = 'closed',
  Open = 'open',
}

export interface AppSettingFields {
  name: AppSettingName
  value: AppSettingValue
  displayName: string
  description: string
}

export type AppSettingsMap = {
  [name in AppSettingName]: AppSettingValue
}

export type AppSettingValue = boolean | number | string
export interface AppSettingModelFields extends AppSettingFields, ModelFields {}
export interface NewAppSettingFields extends AppSettingFields, DateFields {}
export interface UpdateAppSettingFields extends Partial<AppSettingFields>, ModifiedAt {}

export class AppSetting extends Model {
  public readonly name: AppSettingName
  public readonly value: AppSettingValue
  public readonly displayName: string
  public readonly description: string

  constructor(fields: AppSettingModelFields) {
    super(fields)
    this.name = fields.name
    this.value = fields.value
    this.displayName = fields.displayName
    this.description = fields.description
  }

  public static listToMap(appSettings: AppSetting[]): AppSettingsMap {
    return appSettings.reduce((map, setting) => ({
      ...map,
      [setting.name]: setting.value,
    }), {} as AppSettingsMap)
  }

  public toGraphQLType(): AppSettingType {
    return new AppSettingType(this)
  }
}

export const defaultAppSettings: AppSettingFields[] = [
  {
    name: AppSettingName.NumDaysInvitationIsValid,
    value: 30,
    displayName: 'Number of Days Before Invitations Expire',
    description: 'The number of days that an invitation is valid before it expires and can no longer ' +
    'be used to register.',
  },
  {
    name: AppSettingName.UserRegistrationState,
    value: RegistrationState.Closed,
    displayName: 'User Registration State',
    description: 'The current state of new user registration. If Open, then anyone can register. ' +
    'If By Request, then new users can submit a registration request which must then be approved. ' +
    'If Closed, then new users will have no means to initiate registration; new users will only be ' +
    'able to register if sent a registration invitation.',
  },
]
