$(function() {
    $("#button-push-out-loc").click(function() {
        var data = $("#input-push-out-loc").val();
        var latLong;
        if(isLatLong(data)){
            latLong=parseCoords(data);
            loc.setLat(latLong.lat);
            loc.setLon(latLong.lon);
            console.debug(latLong)
        }else{
            loc.setLat(-6.050456);
            loc.setLon(53.362792);
            console.debug("fixed")
        }
        loc.set();
        map.setZoom(2);

        weather.fetchWeather();
    });
});


/*map.getMap().on('click', function(evt) {
  var click_coordinates = evt.coordinate;
  console.log(click_coordinates);
  });*/


function dateChanged(dateText) {
    console.log("Selected date: " + dateText + "; input's current value: " + this.value);
    slider.reset();
    datePicker.setDate(dateText)
        weather.fetchWeather();

}

function sliderChanged(event,ui){
    console.log("Selected hour: " + ui.value)
        datePicker.setHour(ui.value);
    weather.fetchWeather();

}

/**
 * This is called to activate relevant layers on openlayer
 */
function layoutNow(data){
    console.debug("Weather:", data);
    windUi.activate(data.wind);
    sunUi.activate(data.weather[0].description);
    map.overlayWind();
    map.overlaySun();

}


function layoutFcast(data){
    console.debug("TODO: Weather",data)
        $weather.html("<h2>" + data.city.name + "</h2>" +
                "<li>Weather:" + data.list[0].weather[0].description + "</li>" +
                "<li>Wind Speed :" + data.list[0].wind.speed + "</li>" +
                "<li>Wind Dir :" + data.list[0].wind.deg + "</li>")

}


//TODO: Refactor
map = MapMaker();
map.createOSMap(53.267111,-9.043876, 16);
//toady or forecast
var layoutFunc = layoutNow;





