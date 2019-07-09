const logger = require("../logger/logger").logger;
var request = require('request');
require('moment');
const LOG_DATA = process.env.LOG_DATA || false
const API_KEY="d7f67d32-af18-4930-833e-ff638fe826bf"

exports.getTides = (_request, cb)=> {
  try {
    logger.log({level:"debug", message: 'Exiting getTides'});
    request.get(getUri(_request), cb);
    logger.log({level:"debug", message: 'Exiting getTides'});
  }catch(err){
    logger.log({level:"error", message: 'Error getTides'});
    throw("doh",err);
  }
};



const getUri = (_request) => {
  const latTd = _request.params.latitude;
  const lonTd = _request.params.longtitude;
  const date = _request.params.utc_timestamp;
  const days = parseInt(_request.params.days)*60*60*24;
  const geoInfo = `lon=${lonTd}&lat=${latTd}`;
  const _apiUrl= `https://www.worldtides.info/api?extremes&${geoInfo}&datum=LAT&start=${date}&key=${API_KEY}&length=${days}`;
  logger.log({level:'debug','message': "final url" , _apiUrl});
  return _apiUrl;

}

