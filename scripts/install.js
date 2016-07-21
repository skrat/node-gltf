#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    os = require('os'),
    spawnSync = require('child_process').spawnSync;

var COLLADA2GLTF_WIN32_BINARY = 'https://github.com/KhronosGroup/glTF/releases/download/v1.0-draft2/collada2gltf_windows_v1.0-draft_x64.zip';
var INSTALL_PATH = 'glTF/COLLADA2GLTF/bin';

console.log('installing for', os.platform());

if (os.platform() === 'win32') {

  var ret = spawnSync('curl', ['-L', '-O', COLLADA2GLTF_WIN32_BINARY]);

  if (ret.status !== 0) {
    process.exit(1);
  }

  var parts = INSTALL_PATH.split('/'),
      dir = '';

  parts.forEach(function (part) {
    dir = path.join(dir, part);
    fs.mkdirSync(dir);
  });

  ret = spawnSync('unzip', ['-d', dir, path.basename(COLLADA2GLTF_WIN32_BINARY)]);

  process.exit(ret.status);
} else {
  var ret = spawnSync('sh', ['scripts/build.sh']);

  process.exit(ret.status);
}
