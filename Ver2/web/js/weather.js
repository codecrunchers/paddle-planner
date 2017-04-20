var Weather = function()  
{

    return {
        fetchWeather: function(){
            console.log('%c My message here', "background: blue; color: black; padding-left:10px;");
            weatherFetcher.get(loc.getLon(),loc.getLat(),4,layout)
        }
    }

    function layout(data){
        console.log(data);
        $("#weather-data").text(JSON.stringify(data))

    }
}

weather = Weather();
weatherFetcher = OpenWeatherFetcher();


