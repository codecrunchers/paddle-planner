$(function() {
    $("#button-push-out-loc").click(function() {
        var data = $("#input-push-out-loc").val();
        var latlong;
        if(isLatLong(data)){
            latlong=parseLongLatFromLatLong(data);
            console.debug(latlong)
            mymap.jumpTo( latlong[0], latlong[1], 4);
        }else{
            latlong=parseLongLatFromLatLong("53.362792,-6.050456");
            console.log("Fixed " +latlong)
            mymap.jumpTo( latlong[0], latlong[1], 4);
        }
        weatherFetcher.fetchWeather(latlong[0],latlong[1]);
    });
});

function isLatLong(data){
    return data.indexOf(",") != -1;
}

function parseLongLatFromLatLong(data){
    arr = data.split(",").reverse();
    arr[0]=parseFloat(arr[0]);
    arr[1]=parseFloat(arr[1]);
    return arr;
}
