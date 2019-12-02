// tslint:disable: arrow-parens
import { Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { ICampaignService, ServiceName } from './services'
import { Campaign } from './types'

@Service()
@Resolver(Campaign)
export class CampaignResolver {
  constructor(@Inject(ServiceName.campaign) private readonly campaignService: ICampaignService) {}

  @Query(returns => [Campaign])
  public campaigns(): Campaign[] {
    return this.campaignService.findAll()
  }
}
