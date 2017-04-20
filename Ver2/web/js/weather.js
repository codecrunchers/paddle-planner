var Weather = function()  
{
    return {
        fetchWeather: function(){
            weatherFetcher.get(layout)
        }
    }

    function layout(data){
        $("#weather-data").fadeIn( "slow", function() {
             $("#weather-data").text(JSON.stringify(data))
          });
    }
}

weather = Weather();
weatherFetcher = OpenWeatherFetcher();


