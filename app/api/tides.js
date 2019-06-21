const logger = require("../logger/logger").logger;
const rest = require('rest');
require('moment');


exports.getTides = async (request, reply)=> {
  const response =  await fetch(request);
  logger.log({level:"debug", message: response });
  return response;
  
}

const fetch  = async (request) => {
  try {
    const latTd = request.params.latitude;
    const lonTd = request.params.longtitude;
    const date = request.params.utc_timestamp;
    const _apiUrl= 'https://www.worldtides.info/api?extremes&_PH_&datum=lat&start=_start_&key=d7f67d32-af18-4930-833e-ff638fe826bf';
    const updatedUrl = _apiUrl.replace('_PH_','lon='+lonTd+'&lat='+latTd);
    console.log('Tide Search Time %s', date);
    const finalUrl = updatedUrl.replace('_start_',parseInt(parseInt(date)));
    const tidesResponse  = await rest(finalUrl).then(
      function(response) {
        logger.log({level:'info','message': response.status});
        return response.entity;
      }
    );
    logger.log({level:'debug' ,'message': tidesResponse});
    return tidesResponse;
  }catch(err){
    throw("doh",err);
  }
};

