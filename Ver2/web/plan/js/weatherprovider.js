var WeatherProvider = function() {
    _providers = ['OpenWeatherMap'];

    return {
        init: function(){
            $( "#providers" )
                .selectmenu()
                .selectmenu( "menuWidget" )
                .addClass( "overflow" );
            $('#providers').append('<option>'+_providers[0]+'</option>');

        },
        providers: function(){
            return providers;
        }
    }
}

weatherProvider = WeatherProvider();
