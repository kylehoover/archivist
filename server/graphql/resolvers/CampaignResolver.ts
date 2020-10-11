import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { CampaignService, ServiceName } from '../../services'
import { Authorized } from '../decorators'
import { AddCampaignInputType, CampaignType } from '../types'
import { Campaign, withNewModelFields } from '../../models'

@Service()
@Resolver(CampaignType)
class CampaignResolver {
  constructor(@Inject(ServiceName.Campaign) private readonly campaignService: CampaignService) {}

  // Queries //

  @Query(returns => CampaignType, { nullable: true })
  public async campaign(@Arg('id', type => ID) id: string): Promise<CampaignType | undefined> {
    const campaign = await this.campaignService.findById(id)
    return campaign?.toGraphQLType()
  }

  @Query(returns => [CampaignType])
  @Authorized()
  public async campaigns(): Promise<CampaignType[]> {
    const campaigns = await this.campaignService.findAll()
    return campaigns.map(c => c.toGraphQLType())
  }

  // Mutations //

  @Mutation(returns => CampaignType)
  public async addCampaign(@Arg('input') input: AddCampaignInputType): Promise<CampaignType> {
    return new CampaignType(new Campaign({id: '', createdAt: new Date(), modifiedAt: new Date(), name: '', userId: ''}))
    // const campaign = await this.campaignService.insertOne(withNewModelFields(input))
    // return campaign.toGraphQLType()
  }


}

export default CampaignResolver
