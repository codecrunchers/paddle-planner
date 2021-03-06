'use strict';
const csv=require('csvtojson')
const winston  = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = process.env.LOG_DIR || '/tmp';

const buoyLogFile = process.env.BUOY_LOG_FILE || 'paddle-planner-buoys.log';
const weatherLogFile = process.env.WEATHER_LOG_FILE || 'paddle-planner-weather.log';
const tideLogFile = process.env.TIDE_LOG_FILE || 'paddle-planner-tides.log';




// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: `${logDir}/paddle-planner-error.log`, level: 'error'}),
    new winston.transports.File({ filename: `${logDir}/paddle-planner-out.log`, level: `${process.env.LOG_LEVEL || 'info'}`}),
    new winston.transports.Console({level:`${process.env.LOG_LEVEL || 'info'}`})
  ]
});

const buoyLogFilename = path.join(logDir, buoyLogFile);
logger.log({level: "info", message: `Filename for buoy logs: ${buoyLogFilename}`});
const buoyLogger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: buoyLogFilename, level: 'info'}),
    new winston.transports.Console()

  ]
});

const weatherLogFilename = path.join(logDir, weatherLogFile);
logger.log({level: "info", message: `Filename for buoy logs: ${weatherLogFilename}`});
const weatherLogger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: weatherLogFilename, level: 'info'}),
    new winston.transports.Console()
  ]
});


const tideLogFilename = path.join(logDir, tideLogFile);
logger.log({level: "info", message: "Filename for buoy logs", tideLogFilename});
const tideLogger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: tideLogFilename, level: 'info'}),
    new winston.transports.Console()
  ]
});


module.exports = { logger, buoyLogger, weatherLogger, tideLogger} 


