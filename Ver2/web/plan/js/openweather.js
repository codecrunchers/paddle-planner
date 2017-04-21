var _openWeatherCache = new Map


var OpenWeatherFetcher = function()
{

    return {
        get: function(f){
            key = genKey();
            console.debug(_openWeatherCache)
            console.log("Search for Cache Key %s",key);
            console.log(_openWeatherCache.get(key));
            if( _openWeatherCache.get(key) ){
                console.log("Fetching from cache");
                f(_openWeatherCache[key]);
            } else {
                $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b02e22a57d807e57968f7817363f59b2",function(result){
                    console.log('%c Fetching Data', "background: orange; color: white; padding-left:10px;");
                    console.log("Adding Key:%s to cache",key);
                    _openWeatherCache.set(key,result);
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

