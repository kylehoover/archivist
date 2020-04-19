import chalk from 'chalk'

import { AppSetting, UserRole } from '../server/models'

export function logAppSettings(appSettings: AppSetting[]): void {
  if (appSettings.length === 0) {
    console.log('No new app settings added')
  } else {
    console.log('The following app settings have been added or updated:')

    appSettings.forEach(setting => {
      console.log(`${chalk.cyan(setting.displayName)} => ${chalk.green(setting.value)}`)
    })
  }
}

export function logUserRoles(userRoles: UserRole[]): void {
  if (userRoles.length === 0) {
    console.log('No user roles added')
  } else {
    console.log('The following user roles have been added or updated:')

    userRoles.forEach(userRole => {
      console.log(chalk.cyan(userRole.name))
    })
  }
}
