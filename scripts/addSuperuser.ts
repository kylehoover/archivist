import 'reflect-metadata'

import inquirer from 'inquirer'
import { isEmail, isLength } from 'validator'

import { RegistrationType, UserFields } from '../server/models/User'
import { getServiceProvider } from '../server/services/util'
import { hashPassword } from '../server/helpers/auth'
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
      validate: (input): boolean => isLength(input, 1, 50),
    },
    {
      type: 'input',
      name: 'email',
      message: 'Email:',
      validate: (input): boolean => isEmail(input),
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password:',
      validate: (input): boolean => isLength(input, 1, 100),
    },
    {
      type: 'password',
      name: 'passwordConfirmed',
      message: 'Confirm password:',
      validate: (input, answersMap): boolean => input === answersMap?.password,
    },
  ])

  const superuserRole = await userRoleService.findByName('Superuser')

  if (superuserRole === null) {
    throw new Error('The superuser role does not exist')
  }

  const fields: UserFields = {
    name: answers.name,
    email: answers.email,
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
