const logger = require("../logger/logger").logger;
const moment = require('moment');
const request = require('request');
const API_KEY="b02e22a57d807e57968f7817363f59b2"
const PLACEHOLDER = '_PH_'


exports.getWeather = (_request, cb)=> {
  try {
    logger.log({level:"debug", message: 'Entering getWeather'});
    request.get(forecastUri(_request), cb);
    logger.log({level:"debug", message: 'Exiting getWeather'});
  } catch (err) {
    logger.log({level: "error", message: "getWeather Error " , err});
    throw err
  }
}

const forecastUri = (_request)=> {
    //Returns today's weather
    const weatherNow=`http://api.openweathermap.org/data/2.5/weather?${PLACEHOLDER}&appid=${API_KEY}`;
    //Return a list object with 40 entries, = 5*8*3 or 5 days by 24hrs at 3hour intervals
    const weatherFcast=`http://api.openweathermap.org/data/2.5/forecast?${PLACEHOLDER}&appid=${API_KEY}`;
    const latTd = _request.params.latitude;
    const lonTd = _request.params.longtitude;
    const epoch = _request.params.utc_timestamp;
    const epochMoment = moment.utc(epoch);
    var _apiUrl = epochMoment.calendar().indexOf('Today') >= 0 ? weatherNow : weatherFcast;    
    const fullUrl =  _apiUrl.replace(PLACEHOLDER, `lon=${lonTd}&lat=${latTd}`);
    logger.log({level:'debug','message': "final weather url", fullUrl});
    return fullUrl;
}
