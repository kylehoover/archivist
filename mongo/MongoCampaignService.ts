import { Service } from 'typedi'
import { Campaign } from '../graphql/types'
import { ICampaignService } from '../services'

@Service()
class MongoCampaignService implements ICampaignService {
  public findAll(): Campaign[] {
    return [{ id: '1', name: 'Sample Campaign' }]
  }
}

export default MongoCampaignService
