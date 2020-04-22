const moment = require('moment')
const start = moment()
const chalk = require('chalk')
const path = require('path')
const util = require('util')
const { exec } = require('child_process')

const execAsync = util.promisify(exec)

function getFileNamesFromStdout(stdout) {
  return stdout.split('\n').filter(str => str)
}

function isClientFile(fileName) {
  return fileName.split(path.sep)[0] === 'client'
}

function isServerFile(fileName) {
  return !isClientFile(fileName)
}

async function lintFiles(files) {
  await execAsync(`yarn eslint --no-error-on-unmatched-pattern ${files.join(' ')}`)
}

function log(str) {
  process.stdout.write(str)
}

function logLine(str) {
  console.log(str)
}

async function run() {
  try {
    // get staged files
    let { stdout } = await execAsync('git diff --staged --name-only')
    const stagedFiles = getFileNamesFromStdout(stdout)

    if (stagedFiles.length === 0) {
      logLine(chalk.green('No staged files'))
      process.exit(0)
    }

    // get modified files that are not staged
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
    console.log(moment().diff(start))
  } catch (err) {
    logLine(chalk.red('Failed'))

    if (err.stdout) {
      logLine(err.stdout);
    } else if (err.message) {
      logLine(err.message);
    }

    console.log(moment().diff(start))
    process.exit(1)
  }
}

run()
