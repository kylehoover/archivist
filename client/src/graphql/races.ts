import { authenticatedRequest } from './request'
import { GetRacesData, RaceType } from './types'

export const fetchRaces = async (): Promise<RaceType[]> => {
  const query = `
    query GetRaces {
      races {
        id
        modifiedAt
        name
        description
        version
        isSystemRecord
        asiInfo {
          description
          abilityScoreIncreases {
            ability
            isUserChosen
            value
          }
        }
        ageInfo {
          description
        }
        alignmentInfo {
          description
          tendency
        }
        sizeInfo {
          description
          size
        }
        speedInfo {
          description
          walk
        }
        languagesInfo {
          description
          languages
        }
        traits {
          name
          description
        }
        parentRace {
          id
        }
        subraces {
          id
        }
      }
    }
  `

  const data: GetRacesData = await authenticatedRequest(query)
  return data.races
}
