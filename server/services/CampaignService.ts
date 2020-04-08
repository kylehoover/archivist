import DataService from './DataService'
import Campaign, { NewCampaignModelFields, UpdatedCampaignModelFields } from '../models/Campaign'

interface CampaignService extends DataService<
  Campaign,
  NewCampaignModelFields,
  UpdatedCampaignModelFields
> {}

export default CampaignService
