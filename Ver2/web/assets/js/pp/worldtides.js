var WorldTides = function(){

    return {
        fetch: function(_f){
            var _apiUrl= "https://www.worldtides.info/api?extremes&_PH_&datum=lat&start=_start_&key=d7f67d32-af18-4930-833e-ff638fe826bf";
            var updatedUrl = _apiUrl.replace('_PH_',"lon="+loc.getLat()+"&lat="+loc.getLon()); //inverting these  wtf??!!
            var tideNow = datePicker.getDate().valueOf() / 1000;
            console.log("Tide Search Time %s",parseInt(tideNow));

            updatedUrl = updatedUrl.replace('_start_',parseInt(tideNow));

            _key=btoa(updatedUrl);

            if(ppCache.contains(_key)!=null){
                console.log("Tides from cache");
                var result=ppCache.contains(_key);
                _f(result);
            }else{
                console.log("%c Tides from service",'background: #252; color: #bcea55');
                retrieveForecast(updatedUrl,_f);
            }
        }
    }

    function retrieveForecast(amendedUrl,f){
        console.log("Searching for " + amendedUrl)
            $.ajax({
                dataType: "json",
                url: amendedUrl,
                success: function(result){
                    ppCache.add(btoa(amendedUrl),result);
                    f(result);
                }
            });
    }
}

