var OpenWeatherFetcher = function()  
{

    return {
        get: function(lon, lat, f){

            $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b02e22a57d807e57968f7817363f59b2",function(result){
                f(result)
            });
        }

    }
}

