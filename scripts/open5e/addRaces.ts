import 'reflect-metadata'
import axios from 'axios'
import chalk from 'chalk'
import { RaceFields, Size, withNewModelFields } from '../../server/models'
import { getServiceProvider } from '../../server/services'
import { raceSchema } from '../../server/mongo/MongoRaceService'
import Joi from 'joi'

const schema = raceSchema.keys({
  _id: Joi.forbidden(),
  createdAt: Joi.forbidden(),
  modifiedAt: Joi.forbidden(),
})

function getTraitText(str: string): string {
  return str.split('* ')[1]
}

function getSize(str: string): string {
  const match = str.match(/[Yy]our size is (\w+)\./)
  return match !== null ? match[1].toLowerCase() : ''
}

function getLanguages(str: string): string[] {
  const languages = ['Common', 'Draconic', 'Dwarvish', 'Elvish', 'Gnomish', 'Halfling', 'Infernal', 'Orc']
  return languages.filter(language => str.includes(language))
}

async function run(): Promise<void> {
  process.stdout.write('Fetcing races from Open5e . . . ')
  const response = await axios.get('https://api.open5e.com/races/')

  console.log(chalk.green('Done'))
  console.log('Adding races to database . . .')

  const serviceProvider = getServiceProvider()
  await serviceProvider.init()
  const raceService = serviceProvider.getRaceService()

  response.data.results.forEach(async (race: any) => {
    const fields: RaceFields = {
      name: race.name,
      description: race.desc.split('\n')[1],
      asiInfo: {
        description: getTraitText(race.asi_desc),
        abilityScoreIncreases: race.asi.map((asi: any) => ({
          ability: asi.attributes[0].toLowerCase(),
          value: asi.value,
        })),
      },
      ageInfo: {
        description: getTraitText(race.age),
      },
      alignmentInfo: {
        description: getTraitText(race.alignment),
        tendency: [],
      },
      sizeInfo: {
        description: getTraitText(race.size),
        size: getSize(race.size) as Size,
      },
      speedInfo: {
        description: getTraitText(race.speed_desc),
        walk: race.speed.walk,
      },
      languagesInfo: {
        description: getTraitText(race.languages),
        languages: getLanguages(race.languages),
      },
      traits: [],
      parentRaceId: '',
      subraceIds: [],
      isSystemRecord: true,
      userId: '',
    }

    try {
      await schema.validateAsync(fields)
    } catch (err) {
      console.log(`${chalk.red('Error:')} ${race.name}`)
      console.log(`       ${err.message}`)
      return
    }

    // try {
    //   await raceService.insertOne(withNewModelFields(fields))
    // } catch (err) {
    //   console.log(`${chalk.red('Error:')} ${race.name}`)
    //   console.log(`       ${err.message}`)
    //   return
    // }

    console.log(`${chalk.green('Added:')} ${race.name}`)
  })

  // process.exit(0)
}

run()
