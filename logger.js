const pino = require('pino');

const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};

let logDir = `${__dirname}/log/logger.log`;
if (!!process.env.LOG_DIR) {
    logDir = process.env.LOG_DIR;
}

module.exports = pino(
    {
        customLevels: levels, // our defined levels
        useOnlyCustomLevels: true,
        level: 'http',
    },
    pino.destination(logDir),
);