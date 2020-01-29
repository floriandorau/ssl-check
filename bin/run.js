#!/usr/bin/env node

const testssl = require('../src/app');
const config = require('../src/app/config');
const logger = require('../src/util/logger');

const run = async function () {
    logger.info('Running ssl-test');
    const testsslConfig = config.readConfig();
    testssl.runTest(testsslConfig);
};

run().catch(err => logger.error('Error running ssl-test', err));