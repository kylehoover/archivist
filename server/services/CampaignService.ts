import DataService from './DataService'
import Campaign, { CampaignFields } from '../models/Campaign'

interface CampaignService extends DataService<Campaign> {
  insertOne(fields: CampaignFields): Promise<Campaign>
}

export default CampaignService
