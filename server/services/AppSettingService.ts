import { DataService } from './DataService'
import { AppSetting, NewAppSettingFields, UpdateAppSettingFields } from '../models/AppSetting'

export interface AppSettingService extends
  DataService<AppSetting, NewAppSettingFields, UpdateAppSettingFields, {}> {}
