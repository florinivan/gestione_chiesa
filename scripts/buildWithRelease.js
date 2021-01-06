const fs = require('fs');
const semver = require('semver');
const path = require('path');
const { execSync } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));

// Assert that we are running the correct node and npm versions.
require("./checkEngineVersions")();

function exec(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  } catch (err) {
    throw new Error(err.message);
  }
}

function replace(from, to, filePath) {
  const content = fs.readFileSync(filePath, { encoding: 'utf8' });
  const patched = content.replace(from, to);
  fs.writeFileSync(filePath, patched);
}

if (argv.release) {
  const releaseType = argv.release;
  if (!['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease'].includes(releaseType)) {
    throw new Error('invalid release type.');
  }

  const packageJsonPath = `${process.cwd()}${path.sep}package.json`;
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`package.json not found on ${process.cwd()}${path.sep}.`);
  }

  const version = require(packageJsonPath).version;
  if (!semver.valid(version)) {
    throw new Error('invalid semantic version found in package.json.');
  }

  const newVersion = semver.inc(version, releaseType);

  const status = exec(`git status --short`);
  if (status) {
    throw new Error('commit your changes before making a release.');
  }

  exec(`git checkout -b release/${newVersion}`);
  replace(/"version": ".*"/, `"version": "${newVersion}"`, packageJsonPath);
  exec(`git add ${packageJsonPath}`);
  exec(`git commit -m "Pump version to v${newVersion}"`);
  exec(`git push -u origin release/${newVersion}`);

  exec(`git tag -a v${newVersion} -m "Version ${newVersion}"`);
  exec(`git push origin v${newVersion}`);
}

require('./build');
