#!/usr/bin/env node

const testssl = require('./testssl');
const report = require('./report');
const config = require('./config');
const logger = require('./util/logger');

const startCheckUrls = function (urls, options) {
    const promises = [];

    urls.forEach(url => {
        const promise = testssl.checkEndpoint(url, options);
        promises.push(promise);
    });

    return Promise.all(promises);
};

const printReport = function ({ output }) {
    report.printReport(output);
};


const run = function () {
    const configFile = config.readConfig();

    startCheckUrls(configFile.urls, configFile)
        .then(() => printReport(configFile.output))
        .catch(err => logger.error('Someone failed', err));
};

run();