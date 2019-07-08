const logger = require("../logger/logger").logger;
const buoys = require("./buoys");
const weather = require("./weather");
const {csvToJSON, logBuoyData, logWeatherData} = require('../utils/format')

exports.elasticDecorator = async (request, reply) => {
   var _json = await new Promise( resolve => {
    buoys.getBuoy(request, (e,r) => resolve(r.body) )
  }).then ( t => {
    return csvToJSON(t).then ( json => {
      for(entry in json){
        logBuoyData(json[entry])
      }
      return json
    })
  })

  return JSON.stringify(_json);
}

exports.elasticDecoratorWeather = async (request, reply) => {
  var _json = await new Promise( resolve => {
    weather.getWeather(request, (e,r) => resolve(r.body) )
  }).then ( t => {
    const json = JSON.parse(t);
    if(!json.cod == 200){
      logger.log({level: "error", message: "Invalid Resposne from source"});
      throw err
    }
    for(entry in json.list){
      var weatherStat = json.list[entry] 
      weatherStat.city = json.city
      logWeatherData(weatherStat)
    }
    return json
  })
  return JSON.stringify(_json);
}







