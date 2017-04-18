var Weather = function()  
{

    return {
        fetchWeather: function(lon, lat){
            weatherFetcher.get(lon,lat,layout)
        }
    }

    function layout(data){
        console.log(data);
        $("#weather-data").text(data.name)

    }
}

weather = Weather();
weatherFetcher = OpenWeatherFetcher();


