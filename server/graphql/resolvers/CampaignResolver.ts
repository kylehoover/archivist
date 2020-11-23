import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { CampaignService, ServiceName } from '../../services'
import { Authorized, CurrentUser } from '../decorators'
import { AddCampaignInputType, CampaignType } from '../types'
import { RequestUserInfo } from '../../models'
import { withNewModelFields } from '../../models/helpers'

@Service()
@Resolver(CampaignType)
export class CampaignResolver {
  constructor(@Inject(ServiceName.Campaign) private readonly campaignService: CampaignService) {}

  // Queries //

  @Query(returns => CampaignType, { nullable: true })
  @Authorized()
  public async campaign(
    @Arg('id', type => ID) id: string,
    @CurrentUser() userInfo: RequestUserInfo,
  ): Promise<CampaignType | null> {
    const campaign = await this.campaignService.findById(id, { userId: userInfo.userId })
    return campaign?.toGraphQLType() ?? null
  }

  @Query(returns => [CampaignType])
  @Authorized()
  public async campaigns(@CurrentUser() userInfo: RequestUserInfo): Promise<CampaignType[]> {
    const campaigns = await this.campaignService.findAll({ userId: userInfo.userId })
    return campaigns.map(c => c.toGraphQLType())
  }

  // Mutations //

  @Mutation(returns => CampaignType)
  @Authorized()
  public async addCampaign(
    @Arg('input') input: AddCampaignInputType,
    @CurrentUser() userInfo: RequestUserInfo,
  ): Promise<CampaignType> {
    const fields = withNewModelFields({ ...input, userId: userInfo.userId })
    const campaign = await this.campaignService.insertOne(fields)
    return campaign.toGraphQLType()
  }
}
