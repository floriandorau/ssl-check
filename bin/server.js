#!/usr/bin/env node

const server = require('../src/server');
const logger = require('../src/util/logger');

const run = async function () {
    logger.info('Running ssl-test server');
    server.start();
};

run().catch(err => logger.error('Error running ssl-test server', err));