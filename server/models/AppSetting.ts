import Model, { MongoModelFields, NewModelFields, UpdatedModelFields } from './Model'
import { AppSettingType } from '../graphql/types'

export enum AppSettingName {
  NumDaysInvitationIsValid = 'numDaysInvitationIsValid',
  UserRegistrationStatus = 'userRegistrationStatus',
}

export enum UserRegistrationStatusValue {
  ByRequest = 'byRequest',
  Closed = 'closed',
  Open = 'open',
}

export type AppSettingFields = {
  name: AppSettingName
  value: AppSettingValue
  displayName: string
  description: string
}

export type AppSettingsMap = {
  [name in AppSettingName]: AppSettingValue
}

export type AppSettingValue = boolean | number | string
export type MongoAppSettingModelFields = MongoModelFields & AppSettingFields
export type NewAppSettingModelFields = NewModelFields & AppSettingFields
export type UpdatedAppSettingModelFields = UpdatedModelFields & Partial<AppSettingFields>

class AppSetting extends Model {
  constructor(
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    public readonly name: AppSettingName,
    public readonly value: AppSettingValue,
    public readonly displayName: string,
    public readonly description: string,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: MongoAppSettingModelFields): AppSetting {
    return new AppSetting(doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.value, doc.displayName,
      doc.description)
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
    name: AppSettingName.UserRegistrationStatus,
    value: UserRegistrationStatusValue.Closed,
    displayName: 'User Registration Status',
    description: 'The current status of new user registration. If "open," then anyone can register. ' +
    'If "byRequest", then new users can submit a registration request which must then be approved. ' +
    'If "closed", then new users will have no means to initiate registration; new users will only be ' +
    'able to register if sent a registration invitation.',
  },
]

export default AppSetting
