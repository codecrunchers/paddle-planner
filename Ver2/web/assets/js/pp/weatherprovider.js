var WeatherProvider = function() {
    _providers = ['OpenWeatherMap'];

    return {
        init: $( function(){
            console.log("InitWeather Providers");

            $('select[name="provider"]').change(
                    function(){
                        var theValue = this.value;
                        $('select[name="provider"]').val(theValue);
                    });
            $('select[name="provider"]').append($('<option></option>').val(_providers[0]).html(_providers[0]));

        }),
        providers: function(){
            return providers;
        }
    };
}

weatherProvider = WeatherProvider();
