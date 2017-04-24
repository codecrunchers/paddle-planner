function GeoFetchEvent(payload){
    console.debug("GEO",payload);
    if(payload.status.code!="200"){
        $("#dt-info-data").prepend("Provider Issue<br/>")
    }else{
        $("#dt-info-data").prepend(payload.results[0].components.country + " " + payload.results[0].components.city + "<br/>")
    }
}



function dateChanged(dateText) {
    console.log("Selected date: " + dateText + "; input's current value: " + this.value);
    slider.reset();
    datePicker.setDate(dateText);
    datePicker.setDateOffset(0);
    weather.fetchWeather();

}

function sliderChanged(event,ui){
    console.log("Selected hour: " + ui.value);
    datePicker.setDateOffset(ui.value);
    $(".active-date-label").html(moment(datePicker.getDate()).calendar());
    weather.fetchWeather();
}


latestTideData = Object;
function tidesUpdated(tidesdata){
    console.debug("Tides:",tidesdata);
/*    tidesdata.extremes.forEach(function(tideReport){
        var reportDate = moment.unix(tideReport.dt).calendar();
        console.log("Report Date %s",reportDate);
    });*/
    latestTideData = JSON.stringify(tidesdata);
    $("#tides-info-data").append($("<span>"+JSON.stringify(tidesdata)+"</span>"));

}

/**
 * This eventually called(back) - and /
 * is called to activate relevant layers on openlayer
 */
function layoutNow(data){
    console.debug("Weather to be rendered:", data);
    uiOverlays.activate(data);
    map.activateOverlays();
}





//TODO: Refactor below start up events
map = MapMaker();
map.createOSMap(53.267111,-9.043876, 16);
//toady or forecast
layoutFunc = layoutNow;


$( document ).ready(function() {
    console.log( "ready!" );
    $("#input-push-out-loc").val("53.267111,-9.043876"); //paddle in Gaillimh
    $("#button-push-out-loc").click();
});

$("#sampleGalway").click( function() {
    $("#input-push-out-loc").val("53.362792,-6.050456");
    $("#button-push-out-loc").click();
} );

$("#sampleNorway").click( function() {
    $("#input-push-out-loc").val("68.268334,14.892628");
    $("#button-push-out-loc").click();
} );

{$("#button-push-out-loc").click(function() {
    var data = $("#input-push-out-loc").val();
    var latLong;
    if(isLatLong(data)){
        latLong=parseCoords(data);
        loc.setLat(latLong.lat);
        loc.setLon(latLong.lon);
        weather.fetchWeather();
        map.jumpTo(latLong.lon,latLong.lat);
        map.setZoom(6);
        tides.fetch();
        openCageGEO.fetchByCoords(GeoFetchEvent);
    }
                                            });}





