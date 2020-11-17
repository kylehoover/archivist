import { DataService } from './DataService'
import { NewRaceFields, Race, RaceFields, UpdatedRaceFields } from '../models'

export interface RaceService extends
  DataService<Race, NewRaceFields, UpdatedRaceFields, RaceFields> {}
