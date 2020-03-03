import Model from './Model'
import { AppSettingType } from '../graphql/types'
import { MongoDocument } from '../mongo/'

export type AppSettingValue = boolean | number | string

class AppSetting extends Model {
  private constructor(
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    public readonly name: string,
    public readonly value: AppSettingValue,
    public readonly description: string,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: MongoDocument): AppSetting {
    return new AppSetting(doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.value, doc.description)
  }

  public toGraphQLType(): AppSettingType {
    return new AppSettingType(this)
  }
}

export const defaultSettings = [
  {
    description: 'If this setting is true, anyone will be allowed register as a user. ' +
    'If it is false, users will only be able to register by receiving an invitation or by ' +
    'having their registration request accepted.',
    name: 'allowOpenRegistration',
    value: false,
  },
]

export default AppSetting
