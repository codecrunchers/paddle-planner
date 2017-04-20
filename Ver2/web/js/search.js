
function isLatLong(data){
    return data.indexOf(",") != -1;
}

function parseLongLatFromLatLong(data){
    arr = data.split(",").reverse();
    arr[0]=parseFloat(arr[0]);
    arr[1]=parseFloat(arr[1]);
    return { lon: arr[0], lat: arr[1] };
}
