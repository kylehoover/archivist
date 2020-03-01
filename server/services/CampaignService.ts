import DataService from './DataService'
import { Campaign } from '../models'

interface CampaignService extends DataService<Campaign> {}

export default CampaignService
