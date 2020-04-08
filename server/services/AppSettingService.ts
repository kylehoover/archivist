import DataService from './DataService'
import AppSetting, { NewAppSettingModelFields, UpdatedAppSettingModelFields } from '../models/AppSetting'

interface AppSettingService extends DataService<
  AppSetting,
  NewAppSettingModelFields,
  UpdatedAppSettingModelFields
> {}

export default AppSettingService
