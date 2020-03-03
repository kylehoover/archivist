import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import AppSetting, { AppSettingValue } from '../../models/AppSetting'
import { AppSettingValueScalar } from '../scalars'

@ObjectType()
class AppSettingType extends ModelType {
  @Field()
  public name: string

  @Field(type => AppSettingValueScalar)
  public value: AppSettingValue

  @Field()
  public description: string

  constructor(appSetting: AppSetting) {
    super(appSetting)
    this.name = appSetting.name
    this.value = appSetting.value
    this.description = appSetting.description
  }
}

export default AppSettingType
