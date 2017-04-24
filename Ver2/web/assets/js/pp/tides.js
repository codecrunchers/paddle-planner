var Tides = function(){

    _apiKey = "d7f67d32-af18-4930-833e-ff638fe826bf";
    _apiUrl= "https://www.worldtides.info/api?heights&_PH_&key="+_apiKey;

    return {
        fetch: function(){
            var updatedUrl = _apiUrl.replace('_PH_',"lon="+loc.getLat()+"&lat="+loc.getLon()); //inverting these  wtf??!!
            _key=btoa(updatedUrl);

            if(ppCache.contains(_key)!=null){
                console.log("Tides from cache");
                result=ppCache.contains(_key);
                tidesUpdated(result);
            }else{
                console.log("%c Tides from service",'background: #252; color: #bcea55');
                retrieveForecast(updatedUrl,tidesUpdated);
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

tides = Tides();
