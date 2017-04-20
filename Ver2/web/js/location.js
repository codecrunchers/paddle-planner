var Loc = function(){

    _lon= -9.043876;
    _lat = 53.267111;

    return  {
        getLat: function(){
            return _lat;
        },
        getLon: function(){
            return _lon;
        },
        setLat: function(val){
            _lat = val;
        },
        setLon: function(val){
            _lon = val;
        },
        set: function(){
            console.log("Set Lat=%s, Lon=%s",_lat,_lon);
            map.jumpTo(_lon, _lat);
        },
        zoom: function() {
            console.log("todo zoom");
        }
    };
};

loc = Loc();
