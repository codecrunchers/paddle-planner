function GeoFetchEvent(payload){
    console.debug("GEO",payload);
    if(payload.status.code!="200"){
        $("#dt-info-data").prepend("Provider Issue<br/>")
    }else{
        city = payload.results[0].components.city == undefined ? " ?  " : payload.results[0].components.city
            $("#dt-info-data").prepend(payload.results[0].components.country + ", " + city + "<br/>")
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
    weather.fetchWeather();
    tides.fetch();
    $(".active-date-label").html(moment(datePicker.getDate()).calendar());

}


function tidesUpdated(tidesdata){
    console.debug("Tides Recevied:",tidesdata);
    $report="";
    if(tidesdata.status!="200"){
        $report = "Provider Error";
    }else{
        tidesdata.extremes.forEach(function(tideReport){
            tideTime=moment(tideReport.dt*1000);
            paddleTime = datePicker.getDate();
            paddleTimeMiunus1 = datePicker.getDate().subtract(1,'day');
            if(paddleTimeMiunus1 == tideTime.dayOfYear() || paddleTime.dayOfYear() == tideTime.dayOfYear()){
                $report+="<div class='" + tideReport.type.toLowerCase() + "'>";
                $report+=tideTime.format('ddd DD/MM hh:mm') + '(' + tideReport.type + ')    ' + tideReport.height + '</div>';
            }
        });

    }
    console.log("Tides Report %",$report);
    $("#tides-info-data").prepend($report);
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
    $("#input-push-out-loc").val("53.267111,-9.043876"); //paddle in Gaillimh
    $("#button-push-out-loc").click();


    console.log( "ready!" );


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
        openCageGEO.fetchByCoords(GeoFetchEvent);
        tides.fetch();
    }
                                            });}





