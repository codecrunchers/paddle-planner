const logger = require("../logger/logger").logger;
const rest = require('rest');
require('moment');


exports.getGeo = async (request, reply)=> {
  const response =  await fetch(request);
  logger.log({level:"debug", message: response });
  return response;

}

const fetch  = async (request) => {
  try   {
    const latTd = request.params.latitude;
    const lonTd = request.params.longtitude;
    const _apiKey = 'e93c7ebdb0de41fb903db410fa4bbfbd';//TODO: Remove secrets
    const _apiUrl = `http://api.opencagedata.com/geocode/v1/json?q=_PH_&key=${_apiKey}`;
    const updatedUrl = _apiUrl.replace('_PH_',latTd+'+'+lonTd);
    logger.log({level:'debug','message': "final url: " + updatedUrl});

    const geoResponse = await rest(updatedUrl).then(
      function(response) {
        logger.log({level:'info','message': response.status});
        return response.entity;
      });  
    logger.log({level:'debug' ,'message': "Geo:" + geoResponse});
    return geoResponse;
  }catch(err){
    throw err
  }
}



