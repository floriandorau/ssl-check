const pkgDir = require('pkg-dir');
const path = require('path');

const cmd = require('../util/cmd');
const logger = require('../util/logger');
const { createIfNotExist } = require('../util/dir');

const rootDir = pkgDir.sync(__dirname);

const TEST_SSL_BIN_PATH = path.resolve(rootDir, 'bin', 'testssl.sh-3.0', 'testssl.sh');

const _checkEndpoint = function (endpointUrl, { severity, jsonPath, htmlPath, logPath }) {
    logger.info(`Checking endpoint '${endpointUrl.href}'`);

    let args = [TEST_SSL_BIN_PATH];

    if (severity) {
        args = [...args, '--severity', severity];
    }

    if (jsonPath) {
        args = [...args, '--jsonfile', jsonPath];
    }
    if (htmlPath) {
        args = [...args, '--htmlfile', htmlPath];
    }
    if (logPath) {
        args = [...args, '--logfile', logPath];
    }

    logger.debug(`Running testssl with args: ${args.join(', ')}`);

    return cmd.exec('bash', [...args, endpointUrl.href])
        .catch(err => logger.error(`Error while checking endpoint '${endpointUrl.href}'`, err));
};

exports.checkEndpoint = function (url, options = {}) {
    logger.info(`Running ssl endpoint check for '${url}'`);

    const endpointUrl = new URL(url);
    let testsslArgs = {};

    if (options.severity) {
        testsslArgs.severity = options.severity.toUpperCase();
    }

    if (options.output.log) {
        testsslArgs.logPath = createIfNotExist(rootDir, 'output', 'log', endpointUrl.hostname);
    }

    if (options.output.json) {
        testsslArgs.jsonPath = createIfNotExist(rootDir, 'output', 'json', endpointUrl.hostname);
    }

    if (options.output.html) {
        testsslArgs.htmlPath = createIfNotExist(rootDir, 'output', 'html', endpointUrl.hostname);
    }

    return _checkEndpoint(endpointUrl, testsslArgs);
};