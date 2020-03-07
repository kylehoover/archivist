import DataService from './DataService'
import { AppSetting } from '../models'

interface AppSettingService extends DataService<AppSetting> {}

export default AppSettingService
