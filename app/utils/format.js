const { logger , weatherLogger, buoyLogger, tideLogger }= require("../logger/logger")
//const buoyLogger = require("../logger/logger").buoyLogger;
//const weatherLogger = require("../logger/logger").weatherLogger;
//const tideLogger = require("../logger/logger").tideLogger;

const csv=require('csvtojson')

exports.csvToJSON = (fullCSVBouyReport) => {
  logger.log({level:"debug", message: `Converting ${fullCSVBouyReport} to JSON`});
  try {
    return  csv({checkType:true, output:"json"}).fromString(fullCSVBouyReport)
  }catch(e){
    logger.log({level:"error", mesage:"Cannot convert csv to json", e});
    throw e  
  }  
}
exports.logTideData  = (hourlyTideReport) => {
  tideLogger.info(hourlyTideReport);
}

exports.logBuoyData  = (hourlyBuoyReport) => {
  buoyLogger.info(hourlyBuoyReport);
}

exports.logWeatherData  = (hourlyBuoyReport) => {
  weatherLogger.info(hourlyBuoyReport);
}


