import { Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { AppSettingService, ServiceName } from '../../services'
import { AppSettingType } from '../types'

@Service()
@Resolver(AppSettingType)
export class AppSettingResolver {
  constructor(@Inject(ServiceName.AppSetting) private readonly appSettingService: AppSettingService) {}

  @Query(returns => [AppSettingType])
  public async appSettings(): Promise<AppSettingType[]> {
    const appSettings = await this.appSettingService.findAll()
    return appSettings.map(setting => setting.toGraphQLType())
  }
}
