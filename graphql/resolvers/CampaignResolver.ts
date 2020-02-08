import { Arg, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { ICampaignService, ServiceName } from '../../services'
import { Campaign } from '../types'

@Service()
@Resolver(Campaign)
class CampaignResolver {
  constructor(@Inject(ServiceName.campaign) private readonly campaignService: ICampaignService) {}

  @Query(returns => Campaign, { nullable: true })
  public campaign(
    @Arg('id') id: string,
  ): Promise<Campaign | null> {
    return this.campaignService.findById(id)
  }

  @Query(returns => [Campaign])
  public campaigns(): Promise<Campaign[]> {
    return this.campaignService.findAll()
  }
}

export default CampaignResolver
