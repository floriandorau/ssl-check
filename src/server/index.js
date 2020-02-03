
const logger = require('../util/logger');
const { getFilesInDir } = require('../util/dir');

const pkgDir = require('pkg-dir');

const fs = require('fs');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');

const start = async function () {

    const rootDir = pkgDir.sync(__dirname);

    const app = express();

    logger.info('Starting ssl-test-app');

    app.get('/endpoint/', (req, res) => {
        const dir = path.join(rootDir, 'output', 'json');
        const dirents = fs.readdirSync(dir, { withFileTypes: true });
        res.send(dirents.map(dirent => ({ endpoint: dirent.name })));
    });

    app.get('/output/', (req, res) => {
        const dir = path.join(rootDir, 'output', 'json');
        const files = getFilesInDir(dir, { recursive: true });
        res.send(files
            .map(file => file.replace(rootDir, req.headers.host))
            .map(file => {
                const { name, ext } = path.parse(file);
                return { name, ext, link: `http://${file}` };
            })
        );

    });

    app.use('/output/json', serveStatic('../output/json'));

    const port = process.env.PORT || 3000;
    app.listen(port, () => logger.info(`Server is running at localhost:${port}`));
};

module.exports = { start };