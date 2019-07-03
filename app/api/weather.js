const logger = require("../logger/logger").logger;
const rest = require('rest');
const moment = require('moment');

exports.getWeather = async (request, reply)=> {
  const response =  await fetch(request);
  logger.log({level:"debug", message: `Weather: ${response}` });
  return response;

}

const fetch  = async (request) => {
  try {
    const latTd = request.params.latitude;
    const lonTd = request.params.longtitude;
    const epoch = request.params.utc_timestamp;
    //Returns today's weather
    var weatherNow='http://api.openweathermap.org/data/2.5/weather?_PH_&appid=b02e22a57d807e57968f7817363f59b2';
    //Return a list object with 40 entries, = 5*8*3 or 5 days by 24hrs at 3hour intervals
    var weatherFcast='http://api.openweathermap.org/data/2.5/forecast?_PH_&appid=b02e22a57d807e57968f7817363f59b2';
    var epochMoment = moment.utc(epoch);
    const _apiUrl = epochMoment.calendar().indexOf('Today') >= 0 ? weatherNow : weatherFcast;
    const updatedUrl = _apiUrl.replace('_PH_','lon='+lonTd+'&lat='+latTd);
    logger.log({level:'info','message': `final weather url: ${updatedUrl}`});
    const weatherResponse = await rest(updatedUrl).then(
      function(response) {
        logger.log({level:'info','message': response.status});
        return response.entity;
      }

    );
    logger.log({level:'debug' ,'message': weatherResponse});
    return weatherResponse;
  }catch(err){
    throw err
  }
};
