$(function() {
    $("#button-push-out-loc").click(function() {
        var data = $("#input-push-out-loc").val();
        var latLong;
        if(isLatLong(data)){
            latLong=parseLongLatFromLatLong(data);
            loc.setLat(latlong.lat);
            loc.setLon(latlong.lon);
            console.debug(latLong)
            loc.set();
            loc.zoom(4);
        }else{
            loc.setLon(-6.050456);
            loc.setLat(53.362792);
            console.debug("fixed")
            loc.set();
            loc.zoom(4);
        }
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


map = MapMaker();
map.createOSMap(-9.043876, 53.267111, 16);





