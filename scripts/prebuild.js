/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs-extra');
const path = require('path');

const APP_DIR = fs.realpathSync(process.cwd());
const PUBLIC_PATH = path.resolve(APP_DIR, 'public');
const BUILD_PATH = path.resolve(APP_DIR, 'www');

// Remove all content but keep the directory
fs.emptyDir(BUILD_PATH)
  .then(() => {
    // Merge with the public folder
    fs.copySync(PUBLIC_PATH, BUILD_PATH, {
      dereference: true,
    });
  });
