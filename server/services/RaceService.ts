import { DataService } from './DataService'
import { NewRaceFields, Race, UpdatedRaceFields } from '../models'

export interface RaceService extends
  DataService<Race, NewRaceFields, UpdatedRaceFields, {}> {}
