const fs = require('fs');
const path = require('path');

const logger = require('./logger');

const ifNotExists = function (path, callback) {
    if (!fs.existsSync(path)) {
        callback();
    }
};

const create = function (path) {
    fs.mkdirSync(path);
};

exports.createIfNotExist = function (...pathParts) {
    logger.debug(`Check if path '${pathParts}' exists`);

    let buildedPath = '';
    pathParts.forEach(part => {
        buildedPath = path.join(buildedPath, part);

        ifNotExists(buildedPath, () => {
            logger.debug(`Path ${buildedPath} not exists, creating new`);
            create(buildedPath);
        });
    });

    return buildedPath;

};