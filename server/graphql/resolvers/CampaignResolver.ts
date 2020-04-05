import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { CampaignService, ServiceName } from '../../services'
import { CampaignType } from '../types'

@Service()
@Resolver(CampaignType)
class CampaignResolver {
  constructor(@Inject(ServiceName.Campaign) private readonly campaignService: CampaignService) {}

  @Query(returns => CampaignType, { nullable: true })
  public async campaign(@Arg('id', type => ID) id: string): Promise<CampaignType | undefined> {
    const campaign = await this.campaignService.findById(id)
    return campaign?.toGraphQLType()
  }

  @Query(returns => [CampaignType])
  public async campaigns(): Promise<CampaignType[]> {
    const campaigns = await this.campaignService.findAll()
    return campaigns.map(c => c.toGraphQLType())
  }
}

export default CampaignResolver
