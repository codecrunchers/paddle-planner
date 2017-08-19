const rest = require('rest');
var moment = require('moment');


module.exports.weather = (event, context, callback) => {
    const latTd = event.pathParameters.lat;
    const lonTd = event.pathParameters.long;
    const date = parseInt(event.pathParameters.utc_timestamp);

    //Returns and templates!! todays weather
    var weatherNow='http://api.openweathermap.org/data/2.5/weather?_PH_&appid=b02e22a57d807e57968f7817363f59b2';
    //Return a list object with 40 entries, = 5*8*3 or 5 days by 24hrs at 3hour intervals
    var weatherFcast='http://api.openweathermap.org/data/2.5/forecast?_PH_&appid=b02e22a57d807e57968f7817363f59b2';
    const _apiUrl = moment(date).calendar().indexOf('Today') >= 0 ? weatherNow : weatherFcast;
    const updatedUrl = _apiUrl.replace('_PH_','lon='+lonTd+'&lat='+latTd);

    rest(updatedUrl).then(
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

