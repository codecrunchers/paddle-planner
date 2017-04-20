var _openWeatherCache = {};


var OpenWeatherFetcher = function()
{

    return {
        get: function(f){
            console.debug("Cache =" ,_openWeatherCache);
            key = genKey();
            console.log("Search for Cache Key %s, value %s",key,_openWeatherCache[key]);
            if( _openWeatherCache[key] != undefined){
                console.log("Fetching from cache");
                f(_openWeatherCache[key]);
            } else {
                $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b02e22a57d807e57968f7817363f59b2",function(result){
                    console.log('%c Fecthing Data', "background: orange; color: white; padding-left:10px;");
                    console.log("Adding %s to cache",key);
                    _openWeatherCache[key] = result;
                    console.debug("Cache Add k=%s,n=%s ",key,_openWeatherCache);
                    console.debug(_openWeatherCache);
                    f(result)
                });
            }
        }

    }

    function genKey(){
        key = datePicker.getDate() + ":" + datePicker.getHour();
        key = key.toLowerCase();
        return btoa(key);
    }


}

