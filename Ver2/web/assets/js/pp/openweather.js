var OpenWeatherFetcher = function()
{
    return {
        get: function(f){
            ows.getByCoords(loc.getLon(),loc.getLat(), {day: datePicker.getDate(), hour:datePicker.getHour()})
        }
    }
}

