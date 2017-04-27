var AWS = require('aws-sdk');
var http = require("http");

AWS.config.update({region: 'us-west-2'});
var host = "http://api.opencagedata.com";
var apiKey = "5a5f067ce860611c5ff659a845afe65c";
var apiUrlTpl = "/geocode/v1/json?q=_PH_&key=_KEY_";


function performRequest(data, success) {

    var lon = 68.21;
    var lat  = 133.43;

    var options = {
        hostname: host,
        port: 80,
        path: apiUrlTpl.replace("_PH_",lon+"+"+lat).replace("_KEY_",apiKey);
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var req = https.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log(responseString);
            var responseObject = JSON.parse(responseString);
            success(responseObject);
        });
    });

    req.write(dataString);
    req.end();
}

exports.handle = function(e, ctx, cb) {
    console.log('processing event: %j', e);
    var success = function(result){
        console.log('done processing event: %j', result);
        cb(null,result);
    };
    performRequest(endpoint, method, data, success);
};


