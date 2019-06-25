const logger = require("../logger/logger").logger;
const buoyLogger = require("../logger/logger").buoyLogger;
const rest = require('rest');
const csv=require('csvtojson')



const LOG_DATA = process.env.LOG_DATA || false

const logData  = async (fullBuoyReport) => {
  if(LOG_DATA)  {
    for(hourlyReport in fullBuoyReport){
      csv({output:"json"})
        .fromString(hourlyReport).then( (json) => {
          buoyLogger.log({level:"info", message: json});
        })
    }
  }
}

exports.getBuoy = async (request, reply)=> {
  let response;
  logger.log({level: "info", message: `DEVEL >>>  ${process.env.DEVEL}`});

  if(process.env.DEVEL){
    logger.log({level: "info", message: `DEBUG MODE}`});
    response = `HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A`;
  }
  else{    
    logger.log({level: "info", message: `LIVE MODE`});
    response =  await fetch(request);
  }
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


