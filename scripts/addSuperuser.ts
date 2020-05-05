import 'reflect-metadata'

import inquirer from 'inquirer'
import { isEmail } from 'validator'

import { RegistrationType, UserFields } from '../server/models/User'
import { getNormalizedEmail, hashPassword } from '../server/helpers/auth'
import { getServiceProvider } from '../server/services/util'
import { isEmailAvailable } from '../server/helpers/auth'
import { withNewModelFields } from '../server/models/Model'

async function run(): Promise<void> {
  const serviceProvider = getServiceProvider()
  await serviceProvider.init()
  const userService = serviceProvider.getUserService()
  const userRoleService = serviceProvider.getUserRoleService()

  console.log('Add New Superuser')

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name:',
      validate: (input): boolean | string => {
        if (input.length === 0) {
          return 'Name cannot be empty'
        } else if (input.length > 50) {
          return 'Name cannot be greater than 50 characters'
        }

        return true
      },
    },
    {
      type: 'input',
      name: 'email',
      message: 'Email:',
      validate: async (input): Promise<boolean | string> => {
        if (isEmail(input)) {
          let email

          try {
            email = getNormalizedEmail(input)
          } catch (err) {
            return 'Email is invalid'
          }

          if (await isEmailAvailable(email, userService)) {
            return true
          }

          return 'Email is already being used'
        }

        return 'Email is invalid'
      },
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password:',
      validate: (input): boolean | string => {
        if (input.length === 0) {
          return 'Password cannot be empty'
        } else if (input.length > 100) {
          return 'Password cannot be greater than 100 characters'
        }

        return true
      },
    },
    {
      type: 'password',
      name: 'passwordConfirmed',
      message: 'Confirm password:',
      validate: (input, answersMap): boolean | string => {
        if (input !== answersMap?.password) {
          return 'Passwords must match'
        }

        return true
      },
    },
  ])

  const superuserRole = await userRoleService.findByName('Superuser')

  if (superuserRole === null) {
    throw new Error('The superuser role does not exist')
  }

  const fields: UserFields = {
    name: answers.name,
    email: getNormalizedEmail(answers.email),
    roleId: superuserRole.id,
    password: hashPassword(answers.password),
    registration: {
      type: RegistrationType.Superuser,
    },
  }

  userService.insertOne(withNewModelFields(fields))
  console.log(`${answers.name} has been added as a superuser`)
  process.exit()
}

run()
