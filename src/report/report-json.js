
const path = require('path');
const pkgDir = require('pkg-dir');
const { getFilesInDir, readFileSync } = require('../util/dir');

const rootDir = pkgDir.sync(__dirname);

const readFiles = function (jsonDir) {
    const files = [];
    getFilesInDir(jsonDir)
        .map(file => readFileSync(file))
        .map(file => JSON.parse(file))
        .forEach(file => files.push(file));

    return files;
};

const report = function () {
    const files = readFiles(path.join(rootDir, 'output', 'json'));
    files.forEach(file => console.log(file));
};

module.exports = { report };