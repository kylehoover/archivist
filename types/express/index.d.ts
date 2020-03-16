import { AppSettingMap } from '../../server/models/AppSetting'

declare global {
  namespace Express {
    interface Request {
      appSettingsMap: AppSettingMap
    }
  }
}
