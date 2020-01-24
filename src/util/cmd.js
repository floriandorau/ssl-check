const { spawn } = require('child_process');

const logger = require('./logger');

const promisify = function (process) {
    return new Promise((resolve, reject) => {
        process.on('error', err => {
            logger.info(`Process exited with error`);
            reject(err)
        });

        process.on('exit', (code, signal) => {
            logger.info(`Process exited with code ${code}`);
            resolve()
        });
    })
}

const logData = function (data) {
    const buffer = Buffer.from(data, 'utf8');
    logger.info(buffer.toString());
}

exports.exec = function (cmd, args) {
    logger.debug(`Running ${cmd} with args:${args}`);
    const spawnedProcess = spawn(cmd, args);
    spawnedProcess.stdout.on('data', data => logData(data));
    spawnedProcess.stderr.on('data', data => logData(data));
    return promisify(spawnedProcess);
}