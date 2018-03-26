#!/usr/bin/env node

const knexMigrate = require('../package/src')

// It has following signature:
// knexMigrate(command: String, flags: Object, progress: Function)

async function run () {
  const log = ({ action, migration }) =>
    console.log('Doing ' + action + ' on ' + migration)

  await knexMigrate('up', { to: '20170727093232' }, log)
  await knexMigrate('down', { step: 2 }, log)
  await knexMigrate('down', { to: 0 }, log)
  await knexMigrate('up', {}, log)
  await knexMigrate('redo', {}, log)
  await knexMigrate('rollback', {}, log)
  await knexMigrate('redo', {}, log)
  await knexMigrate('down', { to: 0 }, log)
  await knexMigrate('up', { only: '20170427093232' }, log)
  await knexMigrate('up', { only: '20170427093232' }, log)
  // => [...]
  // Migration is not pending: 20170427093232_add_users.js
  // npm ERR! code ELIFECYCLE
  // npm ERR! errno 1
  // npm ERR! example@1.0.0 programmatic: `node ./migrate.js`
  // npm ERR! Exit status 1
}

run().then(
  () => {},
  err => {
    console.error(err.message)
    process.exit(1)
  }
)
