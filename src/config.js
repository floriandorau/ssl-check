const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const logger = require('./util/logger');

const CONFIG_FILE_DIR = process.env.CONFIG_FILE_DIR || path.join('..');
const CONFIG_FILE_NAME = process.env.CONFIG_FILE_NAME || 'config.yaml';

exports.readConfig = function () {
    const config = path.join(CONFIG_FILE_DIR, CONFIG_FILE_NAME);
    logger.debug(`Reading config at '${config}'`);
    const file = fs.readFileSync(config, 'utf8');
    return YAML.parse(file);
};