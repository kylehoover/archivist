import { Container, Inject, Service } from 'typedi'

import { AppSettingService, ServiceName, UserRoleService } from './services'
import AppSetting, { AppSettingsMap } from './models/AppSetting'
import UserRole, { UserRolesMap } from './models/UserRole'

@Service()
class DataProvider {
  private appSettingsMap?: AppSettingsMap
  private isInitialized = false
  private userRolesMap?: UserRolesMap

  constructor(
    @Inject(ServiceName.AppSetting) private readonly appSettingService: AppSettingService,
    @Inject(ServiceName.UserRole) private readonly userRoleService: UserRoleService,
  ) {}

  public static getAppSettingsMap(): AppSettingsMap {
    const dataProvider = DataProvider.getInstance()

    if (dataProvider.appSettingsMap === undefined) {
      throw new Error('DataProvider has not been initialized')
    }

    return dataProvider.appSettingsMap
  }

  public static getUserRoleById(id: string): UserRole {
    return DataProvider.getUserRolesMap()[id]
  }

  public static getUserRolesMap(): UserRolesMap {
    const dataProvider = DataProvider.getInstance()

    if (dataProvider.userRolesMap === undefined) {
      throw new Error('DataProvider has not been initialized')
    }

    return dataProvider.userRolesMap
  }

  public static async init(): Promise<void> {
    const dataProvider = DataProvider.getInstance()

    if (dataProvider.isInitialized) {
      return
    }

    await dataProvider.updateAppSettingsMap()
    await dataProvider.updateUserRolesMap()
    dataProvider.isInitialized = true
  }

  private static getInstance(): DataProvider {
    return Container.get(DataProvider)
  }

  private async updateAppSettingsMap(): Promise<void> {
    const appSettings = await this.appSettingService.findAll()
    this.appSettingsMap = AppSetting.listToMap(appSettings)
  }

  private async updateUserRolesMap(): Promise<void> {
    const userRoles = await this.userRoleService.findAll()
    this.userRolesMap = UserRole.listToMap(userRoles)
  }
}

export default DataProvider
