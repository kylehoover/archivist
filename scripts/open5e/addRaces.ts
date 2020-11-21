import 'reflect-metadata'
import axios from 'axios'
import chalk from 'chalk'
import inquirer from 'inquirer'
import {
  Ability,
  AbilityScoreIncrease,
  Language,
  RaceFields,
  RacialTrait,
  Size,
  withNewModelFields,
  withUpdatedModelFields,
} from '../../server/models'
import { getServiceProvider } from '../../server/services'
import { raceSchema } from '../../server/mongo/MongoRaceService'
import Joi from 'joi'

const schema = raceSchema.keys({
  _id: Joi.forbidden(),
  createdAt: Joi.forbidden(),
  modifiedAt: Joi.forbidden(),
})

const abilities = Object.values(Ability)
const languages = Object.values(Language)

function getAbilityScoreIncrease(asi: any): AbilityScoreIncrease {
  const abilityStr = asi.attributes[0].toLowerCase()
  const ability = abilities.includes(abilityStr as Ability) ? abilityStr as Ability : null

  return {
    ability,
    isUserChosen: ability === null,
    value: asi.value,
  }
}

function getTraitText(str: string): string {
  return str.split('* ')[1]
}

function getSize(str: string): string {
  const match = str.match(/[Yy]our size is (\w+)\./)
  return match !== null ? match[1].toLowerCase() : ''
}

function getLanguages(str: string): string[] {
  return languages.filter(language => str.includes(language))
}

function getTraits(str: string): RacialTrait[] {
  if (str === '') {
    return []
  }

  const list = str.split('\n\n')
  return list.map(traitStr => {
    const match = traitStr.match(/\*{2}_(.+)\._\*{2}\s(.+)/)

    if (match === null || match[1] === undefined || match[2] === undefined) {
      throw new Error(`Failed to parse trait: ${traitStr}`)
    }

    return {
      name: match[1],
      description: match[2],
    }
  })
}

function logError(name: string, message: string): void {
  console.log(`${chalk.red('Error:')} ${name}`)
  console.log(`       ${message}`)
}

async function run(): Promise<void> {
  console.log('Fetcing races from Open5e . . . ')
  const response = await axios.get('https://api.open5e.com/races/')

  console.log('Parsing and validating data . . .')
  const validData: RaceFields[] = []

  response.data.results.forEach((race: any) => {
    const fields: RaceFields = {
      name: race.name,
      description: race.desc.split('\n')[1],
      asiInfo: {
        description: getTraitText(race.asi_desc),
        abilityScoreIncreases: race.asi.map((asi: any) => getAbilityScoreIncrease(asi)),
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
      const traits = getTraits(race.traits)
      fields.traits = traits
    } catch (error) {
      logError(race.name, error.message)
    }

    const { error } = schema.validate(fields)

    if (error) {
      logError(race.name, error.message)
    } else {
      validData.push(fields)
    }
  })

  const serviceProvider = getServiceProvider()
  await serviceProvider.init()
  const raceService = serviceProvider.getRaceService()

  console.log(chalk.green('Validated races'))
  const newRaces = []
  const existingRaces = []

  for (const race of validData) {
    const races = await raceService.findAll({ name: race.name })
    const exists = races.length > 0
    let str = ''

    if (exists) {
      existingRaces.push(race)
      str = chalk.blueBright(`exists, ${races.length}`)
    } else {
      newRaces.push(race)
      str = chalk.greenBright('new')
    }

    console.log(`${race.name} (${str})`)
  }

  if (newRaces.length > 0) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addNew',
        message: 'Add new races?',
        default: false,
      },
    ])

    if (answers.addNew) {
      for (const race of newRaces) {
        try {
          await raceService.insertOne(withNewModelFields(race))
          console.log(`${chalk.green('Added:')} ${race.name}`)
        } catch (error) {
          logError(race.name, error.message)
        }
      }
    }
  }

  if (existingRaces.length > 0) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwriteExisting',
        message: 'Overwrite existing races?',
        default: false,
      },
    ])

    if (answers.overwriteExisting) {
      for (const race of existingRaces) {
        const races = await raceService.findAll({ name: race.name })

        if (races.length > 1) {
          logError(race.name, 'Cannot overwrite, more than one race of this name exists')
          break
        }

        try {
          await raceService.updateById(races[0].id, withUpdatedModelFields(race))
          console.log(`${chalk.blueBright('Updated:')} ${race.name}`)
        } catch (error) {
          logError(race.name, error.message)
        }
      }
    }
  }

  process.exit(0)
}

run()
