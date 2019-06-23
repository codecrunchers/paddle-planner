'use strict';
const winston  = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = process.env.LOG_DIR || '/tmp';
const logFile = process.env.BUOY_LOG || 'paddle-planner-buoys.log';


// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: `${logDir}/paddle-planner-error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${logDir}paddle-planner-out.log` }),
    new winston.transports.Console()
  ]
});

const filename = path.join(logDir, logFile);

const buoyLogger = winston.createLogger({
  // change level if in dev environment versus production
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename })
  ]
});

module.exports = { logger, buoyLogger} 


