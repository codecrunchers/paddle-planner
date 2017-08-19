const rest = require('rest');
require('moment');


module.exports.latlong = (event, context, callback) => {
    const latTd = event.pathParameters.lat;
    const lonTd = event.pathParameters.long;
    const date = event.pathParameters.utc_timestamp;
    const _apiUrl= 'https://www.worldtides.info/api?extremes&_PH_&datum=lat&start=_start_&key=d7f67d32-af18-4930-833e-ff638fe826bf';
    const updatedUrl = _apiUrl.replace('_PH_','lon='+lonTd+'&lat='+latTd);
    console.log('Tide Search Time %s',date);
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

