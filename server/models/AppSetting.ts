import Model, { MongoModelFields, NewModelFields } from './Model'
import { AppSettingType } from '../graphql/types'

export type AppSettingFields = {
  name: AppSettingName
  value: AppSettingValue
  displayName: string
  description: string
}

export type AppSettingMap = {
  [name in AppSettingName]: AppSettingValue
}

export enum AppSettingName {
  AllowOpenRegistration = 'allowOpenRegistration',
}

export type AppSettingValue = boolean | number | string

export type NewAppSettingModelFields = NewModelFields & AppSettingFields

type MongoAppSettingModelFields = MongoModelFields & AppSettingFields

class AppSetting extends Model {
  private constructor(
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

  public static listToMap(appSettings: AppSetting[]): AppSettingMap {
    return appSettings.reduce((map, setting) => ({
      ...map,
      [setting.name]: setting.value,
    }), {} as AppSettingMap)
  }

  public toGraphQLType(): AppSettingType {
    return new AppSettingType(this)
  }
}

export const defaultSettings: AppSettingFields[] = [
  {
    name: AppSettingName.AllowOpenRegistration,
    value: false,
    displayName: 'Allow Open Registration',
    description: 'If this setting is turned on, anyone will be allowed register as a user. ' +
    'If it is turned off, users will only be able to register by receiving an invitation or by ' +
    'having their registration request accepted.',
  },
]

export default AppSetting
