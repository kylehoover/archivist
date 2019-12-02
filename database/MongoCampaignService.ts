import { Service } from 'typedi'
import { ICampaignService } from '../graphql/services'
import { Campaign } from '../graphql/types'

@Service()
class MongoCampaignService implements ICampaignService {
  public findAll(): Campaign[] {
    return [{ id: '1', name: 'Sample Campaign' }]
  }
}

export default MongoCampaignService
