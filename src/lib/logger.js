const winston = require('winston')
const {createLogger, format, transports} = require('winston')
const {combine, timestamp, json} = winston.format;
const errorFilter = format((info, opts) => {
    return info.level === 'error' ? info : false;
  });
  
  const infoFilter = format((info, opts) => {
    return info.level === 'info' ? info : false;
  });
  


const logger = createLogger({
    level: 'info', 
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ), 
    transports: [
        new transports.File({ 
            filename: 'logs/info.log',
            level: 'info',
            format: combine(infoFilter(), timestamp(), json())
        }),
        new transports.File({ 
            filename: 'logs/error.log',
            level: 'error',
            format: combine(errorFilter(), timestamp(), json())
        })
    ]
});

module.exports = {
    logger
}