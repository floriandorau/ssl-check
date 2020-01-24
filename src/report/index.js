
const reportJson = require('./report-json');

exports.printReport = function (output = { log: false, html: false, json: false }) {
    if (output.json) {
        reportJson.report();
    }

    if (output.html) {
        throw new Error('html report not supported yet');
    }

    if (output.log) {
        throw new Error('log report not supported yet');
    }
};