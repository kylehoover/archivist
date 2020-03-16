import chalk from 'chalk'
import path from 'path'
import util from 'util'
import { exec } from 'child_process'

const execAsync = util.promisify(exec)

function getFileNamesFromStdout(stdout: string): string[] {
  return stdout.split('\n').filter(str => str)
}

function isClientFile(fileName: string): boolean {
  return fileName.split(path.sep)[0] === 'client'
}

function isServerFile(fileName: string): boolean {
  return !isClientFile(fileName)
}

async function lintFiles(files: string[]): Promise<void> {
  const filesStr = files.join(' ')
  await execAsync(`eslint --ext .ts --no-error-on-unmatched-pattern ${filesStr}`)
}

function log(str: string): void {
  process.stdout.write(str)
}

function logLine(str: string): void {
  console.log(str)
}

async function run(): Promise<void> {
  try {
    let { stdout } = await execAsync('git diff --staged --name-only')
    const stagedFiles = getFileNamesFromStdout(stdout)

    if (stagedFiles.length === 0) {
      logLine(chalk.green('No staged files'))
      process.exit(0)
    }

    ({ stdout } = await execAsync('git ls-files --modified'))
    const hasUnstagedChanges = stdout.length > 0

    if (hasUnstagedChanges) {
      const modifiedFiles = getFileNamesFromStdout(stdout)
      const stagedFileHasChanges = modifiedFiles.some(
        modifiedFile => stagedFiles.find(stagedFile => modifiedFile === stagedFile)
      )

      if (stagedFileHasChanges) {
        logLine(
          `${chalk.red('ERROR')}: A staged file has been modified. Stage, stash, or discard ` +
          'changes before committing.'
        )

        process.exit(1)
      }
    }

    const stagedServerFiles = stagedFiles.filter(isServerFile)

    if (stagedServerFiles.length > 0) {
      log('Server changes detected, running linter . . . ')
      await lintFiles(stagedServerFiles)
      logLine(chalk.green('Done'))
    }
  } catch (err) {
    logLine(chalk.red('Failed'))

    if (err.stdout) {
      logLine(err.stdout)
    } else if (err.message) {
      logLine(err.message)
    }

    process.exit(1)
  }
}

run()
