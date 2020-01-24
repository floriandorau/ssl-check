#!/usr/bin/env node
const testssl = require('../src');
const config = require('../src/config');
const logger = require('../src/util/logger');

const run = async function () {
    try {
        const testsslConfig = config.readConfig();
        testssl.runTest(testsslConfig);
    } catch (err) {
        logger.error('Error running testssl', err);
    }
};

run();