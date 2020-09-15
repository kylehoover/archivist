import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { CampaignService, ServiceName } from '../../services'
import { CampaignInputType, CampaignType } from '../types'
import { withNewModelFields } from '../../models'

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
  public async campaigns(): Promise<CampaignType[]> {
    const campaigns = await this.campaignService.findAll()
    return campaigns.map(c => c.toGraphQLType())
  }

  // Mutations //

  @Mutation(returns => CampaignType)
  public async addCampaign(@Arg('input') input: CampaignInputType): Promise<CampaignType> {
    const campaign = await this.campaignService.insertOne(withNewModelFields(input))
    return campaign.toGraphQLType()
  }


}

export default CampaignResolver
