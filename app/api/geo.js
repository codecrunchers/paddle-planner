var rest = require('rest');

module.exports.latlong = (event, context, callback) => {
    const _apiKey = '5a5f067ce860611c5ff659a845afe65c';//TODO: Remove secrets
    const _apiUrl = 'http://api.opencagedata.com/geocode/v1/json?q=_PH_&key='+_apiKey;
    const latTd = event.pathParameters.lat;
    const lonTd = event.pathParameters.long;
    console.log('FBC Call GEO Lat=%s, Long=%s',latTd,lonTd);

    const updatedUrl = _apiUrl.replace('_PH_',latTd+'+'+lonTd);

    rest(updatedUrl).then(
        function(response) {
            console.log('response: ', response.entity);
            const httpResponse = {
                statusCode: 200,
                body: response.entity
            };
            callback(null,httpResponse);

        }
        );
};




