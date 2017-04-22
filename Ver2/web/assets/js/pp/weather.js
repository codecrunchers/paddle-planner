var Weather = function()
{
    return {
        fetchWeather: function(){
            weatherFetcher.get(layoutNow)
        }
    }
}

weather = Weather();
weatherFetcher = OpenWeatherFetcher();


