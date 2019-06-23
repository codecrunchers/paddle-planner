const logger = require("../logger/logger").logger;
const buoyLogger = require("../logger/logger").buoyLogger;
const rest = require('rest');
require('moment');


const LOG_DATA = process.env.LOG_DATA || false

const logData  = async (data) => {
  if(LOG_DATA)
    buoyLogger.log({level:"info", message: data });
}

exports.getBuoy = async (request, reply)=> {
  const response =  await fetch(request);
  logger.log({level:"debug", message: response });
  logData(response);
  return response;

}

const fetch  = async (request) => {
  try   {
    logger.log({level: "info", message: `Fetching Buoy Data ${request.params}`});
    const buoyId  = request.params.buoyid;
    const updatedUrl = `https://www.met.ie/forecasts/marine-inland-lakes/buoys/download/${buoyId}`;
    logger.log({level: "info", message: `Fetching Buoy Data from ${updatedUrl}`});

    const buoyResponse  = await rest(updatedUrl).then(
      function(response) {
        logger.log({level:'info','message': response.status});
        return response.entity;
      }
    );
    logger.log({level:'debug' ,'message': buoyResponse});
    return buoyResponse; 
  }catch(err){
    throw err;
  }
}


