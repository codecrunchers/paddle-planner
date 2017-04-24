//Returns and templates!! todays weather
var weatherNow="http://api.openweathermap.org/data/2.5/weather?_PH_&appid=b02e22a57d807e57968f7817363f59b2"

//Return a list object with 40 entries, = 5*8*3 or 5 days by 24hrs at 3hour intervals
var weatherFcast="http://api.openweathermap.org/data/2.5/forecast?_PH_&appid=b02e22a57d807e57968f7817363f59b2"
$weather = $('#weather-data');

var Ow = function(){
    var _apiUrl = weatherNow;
    var _mode =  1; //now
    return {
        getByCoords: function(lon,lat,time){
            checkAndSetForecast();

            var updatedUrl = _apiUrl.replace('_PH_',"lon="+lon+"&lat="+lat);
            _key=btoa(updatedUrl);

            if(ppCache.contains(_key)!=null){
                console.log("from cache");
                result=ppCache.contains(_key);
                if(result.list!=null){
                    result = result.list[datePicker.getDateOffset()];
                }
                layoutFunc(result);
            }else{
                console.log("%c from service",'background: #222; color: #bada55');
                retrieveForecast(updatedUrl,layoutFunc)
            }
        }
    }

    function checkAndSetForecast(){
        date = datePicker.getDate();
        console.debug("Is Today",date);
        if(moment(date).calendar().indexOf("Today") >= 0){
            _apiUrl = weatherNow;
        }else{
            _apiUrl = weatherFcast;
        }
    }

    function retrieveForecast(amendedUrl,f){
        console.log("Searching for " + amendedUrl)
            $.ajax({
                dataType: "json",
                url: amendedUrl,
                success: function(result){
                    ppCache.add(btoa(amendedUrl),result);
                    if(result.list!=null){
                        result = result.list[datePicker.getDateOffset()];
                    }
                    f(result);
                }
            });
    }

};


var ows = Ow();
