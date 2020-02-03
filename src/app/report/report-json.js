
const path = require('path');
const pkgDir = require('pkg-dir');

const Readable = require('stream').Readable;

const { getFilesInDir, readFileSync } = require('../../util/dir');

const rootDir = pkgDir.sync(__dirname);

const readFiles = function ({ dir }) {
    const files = [];
    getFilesInDir(dir, { recursive: true })
        .map(file => readFileSync(file))
        .map(file => JSON.parse(file))
        .forEach(file => files.push(file));

    return files;
};

const report = function (hostname) {
    const files = readFiles({
        dir: path.join(rootDir, 'output', 'json', hostname)
    });

    const stream = new Readable({
        objectMode: true,
        read() { }
    });

    files.forEach(file => stream.push(file));

    return stream;
};


module.exports = { report };