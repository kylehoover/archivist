import { Container, Inject, Service } from 'typedi'

import AppSetting, { AppSettingsMap } from './models/AppSetting'
import UserRole, { UserRolesMap } from './models/UserRole'
import { AppSettingService, ServiceName, UserRoleService } from './services'

@Service()
class DataProvider {
  private appSettingsMap?: AppSettingsMap
  private defaultUserRoleId?: string
  private isInitialized = false
  private userRolesMap?: UserRolesMap

  constructor(
    @Inject(ServiceName.AppSetting) private readonly appSettingService: AppSettingService,
    @Inject(ServiceName.UserRole) private readonly userRoleService: UserRoleService,
  ) {}

  public static getAppSettingsMap(): AppSettingsMap {
    return DataProvider.getInstance().appSettingsMap!
  }

  public static getDefaultUserRole(): UserRole {
    const dataProvider = DataProvider.getInstance()
    return dataProvider.userRolesMap![dataProvider.defaultUserRoleId!]
  }

  public static getDefaultUserRoleId(): string {
    return DataProvider.getInstance().defaultUserRoleId!
  }

  public static getUserRoleById(id: string): UserRole {
    return DataProvider.getUserRolesMap()[id]
  }

  public static getUserRolesMap(): UserRolesMap {
    return DataProvider.getInstance().userRolesMap!
  }

  public static async init(): Promise<void> {
    const dataProvider = Container.get(DataProvider)

    if (dataProvider.isInitialized) {
      return
    }

    await dataProvider.updateAppSettingsMap()
    await dataProvider.updateUserRoleFields()
    dataProvider.isInitialized = true
  }

  private static getInstance(): DataProvider {
    const dataProvider = Container.get(DataProvider)

    if (!dataProvider.isInitialized) {
      throw new Error('DataProvider has not been initialized')
    }

    return dataProvider
  }

  private async updateAppSettingsMap(): Promise<void> {
    const appSettings = await this.appSettingService.findAll()
    this.appSettingsMap = AppSetting.listToMap(appSettings)
  }

  private async updateUserRoleFields(): Promise<void> {
    const userRoles = await this.userRoleService.findAll()
    this.defaultUserRoleId = UserRole.getDefaultRoleFromList(userRoles).id
    this.userRolesMap = UserRole.listToMap(userRoles)
  }
}

export default DataProvider
