import DataService from './DataService'
import AppSetting, { NewAppSettingModelFields } from '../models/AppSetting'

interface AppSettingService extends DataService<AppSetting, NewAppSettingModelFields> {}

export default AppSettingService
