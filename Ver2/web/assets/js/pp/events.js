$(function() {
    $("#button-push-out-loc").click(function() {
        var data = $("#input-push-out-loc").val();
        var latLong;
        if(isLatLong(data)){
            latLong=parseCoords(data);
            loc.setLat(latLong.lat);
            loc.setLon(latLong.lon);
            weather.fetchWeather();
            map.jumpTo(latLong.lon,latLong.lat)
            map.setZoom(6);
            openCageGEO.fetchByCoords(GeoFetchEvent);
        }
    });

});

function GeoFetchEvent(payload){
    console.debug("GEO",payload);
    if(payload.status.code!="200"){
        $("#dt-info-data").prepend("Provider Issue<br/>")
    }else{
        $("#dt-info-data").prepend(payload.results[0].components.country + " " + payload.results[0].components.city + "<br/>")
    }
}


function updateInfoRefactor(){
/*    var coord = [loc.getLon(),loc.getLat()];
    var template = 'Coordinate is ({x}|{y}).';
    out = ol.coordinate.format(coord, template, 2);
    paddleDate = datePicker.getDate();
    var templateDate =  "Date: " + moment(paddleDate).calendar();
    out+= templateDate;
    console.debug("Tpl:",out);
    $(".curdatetimeloc").text(out);
    */
}



function dateChanged(dateText) {
    console.log("Selected date: " + dateText + "; input's current value: " + this.value);
    slider.reset();
    datePicker.setDate(dateText);
    datePicker.setDateOffset(0);
    weather.fetchWeather();
    updateInfoRefactor();

}

function sliderChanged(event,ui){
    console.log("Selected hour: " + ui.value);
    datePicker.setDateOffset(ui.value);
    $(".active-date-label").html(moment(datePicker.getDate()).calendar());
    weather.fetchWeather();
    updateInfoRefactor();

}


function tidesUpdated(tidesdata){
    console.debug("Tides:",tidesdata);
}

/**
 * This eventually called(back) - and /
 * is called to activate relevant layers on openlayer
 */
function layoutNow(data){
    console.debug("Weather to be rendered:", data);

    uiOverlays.activate(data);
    map.activateOverlays();
    //    map.overlayWind();
    //   map.overlaySun();
    //  map.overlayInfo();


}




//TODO: Refactor
map = MapMaker();
map.createOSMap(53.267111,-9.043876, 16);
//toady or forecast
var layoutFunc = layoutNow;



weather.fetchWeather();
map.setZoom(8);
updateInfoRefactor();
openCageGEO.fetchByCoords(GeoFetchEvent);
tides.fetch();
map.jumpTo(53.267111,-9.043876);
