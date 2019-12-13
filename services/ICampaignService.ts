import { Campaign } from '../graphql/types'
import IDataService from './IDataService'

interface ICampaignService extends IDataService<Campaign> {}

export default ICampaignService
