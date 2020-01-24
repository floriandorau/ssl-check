const pkgDir = require('pkg-dir');
const path = require('path');

const cmd = require('./util/cmd');
const logger = require('./util/logger');
const { createIfNotExist } = require('./util/dir');

const rootDir = pkgDir.sync(__dirname);

const TEST_SSL_BIN_PATH = path.resolve(rootDir, 'bin', 'testssl.sh-3.0', 'testssl.sh');

const _checkEndpoint = function (endpointUrl, { jsonPath, htmlPath, logPath }) {
    logger.info(`Checking endpoint '${endpointUrl.href}'`);
    let args = [
        TEST_SSL_BIN_PATH,
        '--severity',
        'HIGH',
    ];

    if (jsonPath) {
        args = [...args, '--jsonfile', jsonPath];
    }
    if (htmlPath) {
        args = [...args, '--htmlfile', htmlPath];
    }
    if (logPath) {
        args = [...args, '--logfile', logPath];
    }

    return cmd.exec('bash', [...args, endpointUrl.href])
        .catch(err => logger.error(`Error while checking endpoint '${endpointUrl.href}'`, err));
}

exports.checkEndpoint = function (url, output = { html: false, json: false }) {
    logger.info(`Running ssl endpoint check for '${url}'`);

    const endpointUrl = new URL(url);
    return _checkEndpoint(endpointUrl, {
        jsonPath: output.json && createIfNotExist(rootDir, 'output', 'json', endpointUrl.hostname),
        htmlPath: output.html && createIfNotExist(rootDir, 'output', 'html', endpointUrl.hostname),
        logPath: createIfNotExist(rootDir, 'log', endpointUrl.hostname)
    })
}