import DataService from './DataService'
import Campaign, { NewCampaignModelFields } from '../models/Campaign'

interface CampaignService extends DataService<Campaign, NewCampaignModelFields> {}

export default CampaignService
