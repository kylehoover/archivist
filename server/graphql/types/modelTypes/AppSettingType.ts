import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import { AppSetting, AppSettingName, AppSettingValue } from '../../../models'
import { AppSettingValueScalar } from '../../scalars'

@ObjectType()
class AppSettingType extends ModelType {
  @Field()
  public name: AppSettingName

  @Field(type => AppSettingValueScalar)
  public value: AppSettingValue

  @Field()
  public displayName: string

  @Field()
  public description: string

  constructor(appSetting: AppSetting) {
    super(appSetting)
    this.name = appSetting.name
    this.value = appSetting.value
    this.displayName = appSetting.displayName
    this.description = appSetting.description
  }
}

export default AppSettingType
