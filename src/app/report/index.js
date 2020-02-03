const logger = require('../../util/logger');
const reportJson = require('./report-json');

exports.printReport = function (options = { log: false, html: false, json: false }) {
    if (options.json) {
        logger.info('Printing json report');
        const reportStream = reportJson.report();
        reportStream.on('data', (data) => console.log('<-', data));
    }

    if (options.html) {
        throw new Error('html report not supported yet');
    }

    if (options.log) {
        throw new Error('log report not supported yet');
    }
};

exports.getReport = function (hostname, options = { json: false }) {
    if (options.json) {
        return reportJson.report(hostname, options);
    }
};

exports.listReport = function (options = { json: false }) {
    if (options.json) {
        return reportJson.list();
    }
};
