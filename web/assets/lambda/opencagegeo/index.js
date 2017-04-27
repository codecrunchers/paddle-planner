console.log('starting function')
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

var http = require("http");
var options = {
  hostname: 'www.postcatcher.in',
  port: 80,
  path: '/catchers/544b09b4599c1d0200000289',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  }
};


exports.handle = function(e, ctx, cb) {
    console.log('processing event: %j', e);
    var lon = e.lon;
    var lat = e.lat;

    var _apiKey = process.env.S3_BUCKET
    var _apiUrl = "http://api.opencagedata.com/geocode/v1/json?q=_PH_&key="+_apiKey;
    var updatedUrl = _apiUrl.replace('_PH_',lon+"+"+lat);
    console.log("FBC Calliong %s Lon=%s, Lat=%s",updatedUrl,lon,lat);

    console.log("GEO Searching for " + updatedUrl)
 /*       $.getJSON({
            url: updatedUrl,
            crossDomain: true,
            jsonp: f,
            dataType: "json",
            data: {
                format: "json"
            },
            success: function(result){
                 console.debug("Received GEO Response %j", result);
                  cb(null, result)
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("%c Status: %s , Error %s",'background: #CCC; color: #bada55',textStatus,errorThrown);
                cb(null, { error: textStatus} );
            }
        });
        */
        cb(null, { "1":"1" } );

}


