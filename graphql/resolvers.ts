// tslint:disable: arrow-parens

import { Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import ICampaignService from './services/ICampaignService'
import { Campaign } from './types'

@Service()
@Resolver(Campaign)
export class CampaignResolver {
  constructor(@Inject('service.campaign') private readonly campaignService: ICampaignService) {}

  @Query(returns => [Campaign])
  public campaigns(): Campaign[] {
    return this.campaignService.findAll()
  }
}
