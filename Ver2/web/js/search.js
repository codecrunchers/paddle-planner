$(function() {
    $("#button-push-out-loc").click(function() {
        var data = $("#input-push-out-loc").val();
        if(isLatLong(data)){
            latlong=parseLongLatFromLatLong(data);
            console.debug(latlong)
            mymap.jumpTo( latlong[0], latlong[1], 4);
        }

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
