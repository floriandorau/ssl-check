#!/usr/bin/env node

const testssl = require('./testssl');
const report = require('./report');
const DEFAULT_OPTIONS = {
    severity: 'LOW',
    output: {
        json: false,
        html: false,
        log: false
    }
};

const runTest = function ({ urls, options = DEFAULT_OPTIONS }) {
    const promises = [];

    urls.forEach(url => {
        const promise = testssl.checkEndpoint(url, options);
        promises.push(promise);
    });

    return Promise.all(promises);
};

const getTestReport = function (options = { json: false, html: false }) {
    return report.printReport(options);
};

module.exports = { runTest, getTestReport };