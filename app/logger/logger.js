const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    //new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //new winston.transports.File({ filename: 'out.log' }),
    new winston.transports.Console()
  ]
});

exports.logger = logger;
