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
            updateInfoRefactor();
        }
    });

});

function GeoFetchEvent(payload){
    console.debug("GEO",payload);
    $("#dt-info-data").prepend(payload.results[0].components.city + "<br/>")
}


function updateInfoRefactor(){
    var coord = [loc.getLon(),loc.getLat()];
    var template = 'Coordinate is ({x}|{y}).';
    out = ol.coordinate.format(coord, template, 2);
    paddleDate = datePicker.getDate();
    var templateDate =  "Date: " + paddleDate;
    out+= templateDate;
    console.debug("Tpl:",out);
    $(".curdatetimeloc").text(out);
    openCageGEO.fetchByCoords(coord[0],coord[1], GeoFetchEvent);

}



function dateChanged(dateText) {
    console.log("Selected date: " + dateText + "; input's current value: " + this.value);
    slider.reset();
    datePicker.setDate(dateText)
        datePicker.setDateOffset(0);
    weather.fetchWeather();
    updateInfoRefactor();

}

function sliderChanged(event,ui){
    console.log("Selected hour: " + ui.value)
        datePicker.setDateOffset(ui.value);
    weather.fetchWeather();
    updateInfoRefactor();
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



weather.fetchWeather();
map.setZoom(8);
updateInfoRefactor();
