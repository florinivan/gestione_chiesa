'use strict';
const crossSpawn = require('cross-spawn');
const fs = require('fs-extra');
const invariant = require('invariant');
const os = require('os');
const chalk = require('chalk');
const { appPackageJson } = require('../config/paths');

function assertValidEngines(engines) {
  invariant(
    typeof engines === 'object' && engines,
    `expected package.json to include 'engines' object`
  );

  invariant(
    typeof engines.node === 'string' && typeof engines.npm === 'string',
    `expected package.json to include 'engines: { node: string, npm: string }',` +
      `got '${engines ? JSON.stringify(engines) : engines}' instead`
  );
}

// Node Releases support ranges: https://nodejs.org/en/about/releases/
function checkEngineVersions() {
  const pkg = fs.readJSONSync(appPackageJson, {
    encoding: 'utf-8'
  });

  assertValidEngines(pkg.engines);

  // @see https://www.npmjs.com/package/check-node-version
  const processOutput = crossSpawn.sync('npx', ['check-node-version', '--package'], {
    encoding: 'utf-8'
  });

  // `status` is the exit code,
  // a value that is not `0` or `null` (termination caused by an OS signal)
  // indicates a non 'OK' program termination.
  // @see https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
  if (processOutput.status) {
    // eslint-disable-next-line no-console
    console.error(chalk.red(`-- ${pkg.name} check engine version invariant error --${os.EOL}`));

    // eslint-disable-next-line no-console
    console.error(processOutput.output.filter(Boolean).join(os.EOL));

    // eslint-disable-next-line no-console
    console.error(
      [
        chalk.blue(`Additional info:${os.EOL}`),
        `- cwd: ${chalk.green(process.cwd())}`,
        `- script: ${chalk.green(process.argv[1])}`,
        `- nodeBinPath: ${chalk.green(process.argv[0])}`
      ].join(os.EOL),
      os.EOL
    );

    process.exit(1);
  }
}

module.exports = checkEngineVersions;

if (require.main === module) {
  checkEngineVersions();
}
