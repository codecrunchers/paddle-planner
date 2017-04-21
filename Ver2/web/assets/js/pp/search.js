
function isLatLong(data){
    return data.indexOf(",") != -1;
}

function parseCoords(data){
    arr = data.split(",");
    arr[0]=parseFloat(arr[0].trim());
    arr[1]=parseFloat(arr[1].trim());
    return { lon: arr[0], lat: arr[1] };
}
