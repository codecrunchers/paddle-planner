const logger = require("../logger/logger").logger;
const buoyLogger = require("../logger/logger").buoyLogger;
const csv=require('csvtojson')

exports.csvToJSON = (fullCSVBouyReport) => {
  logger.log({level:"debug", message: `Converting ${fullCSVBouyReport} to JSON`});
  try {
    return  csv({output:"json"}).fromString(fullCSVBouyReport)
  }catch(e){
    logger.log({level:"error", mesage:"Cannot convert csv to json", e});
    throw e  
  }  
}

exports.logBuoyData  = (hourlyBuoyReport) => {
  buoyLogger.info(hourlyBuoyReport);
}

exports.logWeatherData  = (hourlyBuoyReport) => {
  logger.info(hourlyBuoyReport);
}


