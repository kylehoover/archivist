import { Race } from "../races";
import { GetRacesData } from "./types";
import { authenticatedRequest } from "./request";

export const fetchRaces = async (): Promise<Race[]> => {
  const query = `
    query GetRaces {
      races {
        id
        createdAt
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
  `;

  const data: GetRacesData = await authenticatedRequest(query);
  return data.races;
};
