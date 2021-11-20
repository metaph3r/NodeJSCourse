const winston = require('winston')
const { combine, timestamp, printf } = winston.format

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console()
    ]
})

module.exports = logger