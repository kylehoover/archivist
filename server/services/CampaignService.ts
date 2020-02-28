import { Campaign } from '../graphql/types'
import DataService from './DataService'

interface CampaignService extends DataService<Campaign> {}

export default CampaignService
