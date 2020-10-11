import DataService from './DataService'
import { Campaign, NewCampaignFields, UpdatedCampaignFields } from '../models'
// import Campaign, { NewCampaignModelFields, UpdatedCampaignModelFields } from '../models/Campaign'

// interface CampaignService extends DataService<
//   Campaign,
//   NewCampaignModelFields,
//   UpdatedCampaignModelFields
// > {}

interface CampaignService extends DataService<
  Campaign,
  NewCampaignFields,
  UpdatedCampaignFields
> {}

export default CampaignService
