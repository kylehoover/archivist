import DataService from './DataService'
import AppSetting, { NewAppSettingModelFields, UpdatedAppSettingModelFields } from '../models/AppSetting'

interface AppSettingService extends DataService<AppSetting, NewAppSettingModelFields> {
  updateById(
    id: string,
    fields: UpdatedAppSettingModelFields,
    options?: {
      returnOriginal: false
      upsert: false
    },
  ): Promise<AppSetting>
}

export default AppSettingService
