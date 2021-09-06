const fs = require('fs');
const { join } = require('path');

const logger = require('./logger');

const ifNotExists = function (path, callback) {
    if (!fs.existsSync(path)) {
        callback();
    }
};

const create = function (path) {
    fs.mkdirSync(path);
};

const readFileSync = function (filePath) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
};

const getFilesInDir = function (dirpath, options = { recursive: false }) {
    const dirents = fs.readdirSync(dirpath, { withFileTypes: true });

    let files = [];
    dirents.forEach(dirent => {
        if (dirent.isDirectory() && options.recursive) {
            const filesSubDir = getFilesInDir(join(dirpath, dirent.name));
            files = [...files, ...filesSubDir];
        }

        if (dirent.isFile()) {
            files.push(join(dirpath, dirent.name));
        }
    });

    return files;
};

const createIfNotExist = function (...pathParts) {
    logger.debug(`Check if path '${pathParts}' exists`);

    let buildedPath = '';
    pathParts.forEach(part => {
        buildedPath = join(buildedPath, part);

        ifNotExists(buildedPath, () => {
            logger.debug(`Path ${buildedPath} not exists, creating new`);
            create(buildedPath);
        });
    });

    return buildedPath;

};

module.exports = { createIfNotExist, getFilesInDir, readFileSync };