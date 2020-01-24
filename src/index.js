#!/usr/bin/env node

const ssl = require('./ssl');
const config = require('./config');
const logger = require('./util/logger');

const startCheckUrls = function (urls, config = {}) {
    logger.info('Starting url check');
    const promises = [];

    const output = config.output || { html: false, json: false };

    urls.forEach(url => {
        const promise = ssl.checkEndpoint(url, output);
        promises.push(promise);
    });

    return Promise.all(promises);
};

const run = function () {
    const configFile = config.readConfig();
    startCheckUrls(configFile.urls, configFile)
        .then(() => logger.info('All succeeded'))
        .catch(err => logger.error('Someone failed', err));
};

run();