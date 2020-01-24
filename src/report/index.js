const logger = require('../util/logger');
const reportJson = require('./report-json');

exports.printReport = function (options = { log: false, html: false, json: false }) {
    console.dir(options);
    if (options.json) {
        logger.info('Printing json report');
        reportJson.report();
    }

    if (options.html) {
        throw new Error('html report not supported yet');
    }

    if (options.log) {
        throw new Error('log report not supported yet');
    }
};