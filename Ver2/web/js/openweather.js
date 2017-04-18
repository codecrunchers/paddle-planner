var WeatherFetcher = function()  
{

    return {
        fetchWeather: function(lon, lat){
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b02e22a57d807e57968f7817363f59b2",function(result){
                console.log("Location: "+result.name);
                console.log("Weather: "+ result.weather[0].description);
                $( "#weather-data" ).text(result);
            });
        }

    }
}

weatherFetcher = WeatherFetcher();
