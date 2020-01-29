const logger = require('../util/logger');

const { getReport } = require('../app/report');

const express = require('express');

const start = async function () {
    const app = express();

    logger.info('Starting ssl-test-app');


    app.get('/report/:hostname', (req, res) => {
        const stream = getReport(req.params.hostname, { json: true });
        stream.on('data', (data) => res.send(data));
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => logger.info(`Server is running at localhost:${port}`));
};

module.exports = { start };