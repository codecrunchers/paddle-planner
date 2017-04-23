$(function() {
    $("#button-push-out-loc").click(function() {
        var data = $("#input-push-out-loc").val();
        var latLong;
        if(isLatLong(data)){
            latLong=parseCoords(data);
            loc.setLat(latLong.lat);
            loc.setLon(latLong.lon);
            console.debug(latLong);
            map.setZoom(6);
            weather.fetchWeather();
            updateInfo();
        }
    });

});


function updateInfo(){
    var coord = [loc.getLon(),loc.getLat()];
    var template = 'Coordinate is ({x}|{y}).';
    out = ol.coordinate.format(coord, template, 2);
    paddleDate = datePicker.getDate();
    paddleHour = datePicker.getHour();
    var templateDate =  "Date: " + paddleDate + " Hour: " +paddleHour;
    out+= templateDate;
    console.debug("Tpl:",out);
    $(".curdatetimeloc").text(out);

}

function dateChanged(dateText) {
    console.log("Selected date: " + dateText + "; input's current value: " + this.value);
    slider.reset();
    datePicker.setDate(dateText)
    datePicker.setHour(0);
    weather.fetchWeather();
    updateInfo();

}

function sliderChanged(event,ui){
    console.log("Selected hour: " + ui.value)
    datePicker.setHour(ui.value);
    weather.fetchWeather();
    updateInfo();
}

/**
* This is called to activate relevant layers on openlayer
 */
function layoutNow(data){
    console.debug("Weather:", data);
    uiOverlays.activate(data);
    map.overlayWind();
    map.overlaySun();
    map.overlayInfo();

}




//TODO: Refactor
map = MapMaker();
map.createOSMap(53.267111,-9.043876, 16);
//toady or forecast
var layoutFunc = layoutNow;





