const logger = require("../logger/logger").logger;
const buoyLogger = require("../logger/logger").buoyLogger;
const csv=require('csvtojson')

exports.csvToJSON = (fullCSVBouyReport) => {
  logger.log({level:"debug", message: `Conerting ${fullCSVBouyReport} to JSON`});

  return csv({output:"json"})
    .fromString(fullCSVBouyReport).then( (json) => {
      return json;
    });
}


exports.logBuoyData  = async (data) => {
  csvToJSON(data).then( (m)=> buoyLogger.info(m));
}

