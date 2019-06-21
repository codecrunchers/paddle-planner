const logger = require("../logger/logger").logger;
const rest = require('rest');
require('moment');


exports.getTides = async (request, reply)=> {
  logger.log({level:'info', message: "Params: " + request.params});
  return {}
  //return await fetch(request);
}

const fetch  = (request) => {
    const latTd = request.latitude;
    const lonTd = request.longtitude;
    const date = request.utc_timestamp;
    const _apiUrl= 'https://www.worldtides.info/api?extremes&_PH_&datum=lat&start=_start_&key=d7f67d32-af18-4930-833e-ff638fe826bf';
    const updatedUrl = _apiUrl.replace('_PH_','lon='+lonTd+'&lat='+latTd);
    console.log('Tide Search Time %s', date);
    const finalUrl = updatedUrl.replace('_start_',parseInt(parseInt(date)));
    rest(finalUrl).then(
        function(response) {
            console.log('response: %s', response.entity);
            const httpResponse = {
                statusCode: 200,
                body: response.entity
            };
            callback(null,httpResponse);
        }
        );
};

