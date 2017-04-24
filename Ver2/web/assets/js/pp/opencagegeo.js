var OpenCageGEO = function() {
    var _apiKey = "5a5f067ce860611c5ff659a845afe65c";//oops
    var _apiUrl = " http://api.opencagedata.com/geocode/v1/json?q=_PH_&key="+_apiKey;

    return {
        fetchByCoords: function(f){
            console.log("FBC Call GEO Lon=%s, Lat=%s",loc.getLon(),loc.getLat());
            var updatedUrl = _apiUrl.replace('_PH_',loc.getLon()+"+"+loc.getLat());
            console.log("GEO URL: %s",updatedUrl);
            _key=btoa(updatedUrl);

            if(ppCache.contains(_key)!=null){
                console.log("from cache geo");
                result=ppCache.contains(_key);
                console.log("GEO Response as Sting: %s",JSON.stringify(result));
                return result;
            }else{
                console.log("%c call to geo service",'background: #aaa; color: #bada55');
                return fetch(updatedUrl, f);
            }

        }
    }


    function fetch(amendedUrl,f){
        console.log("GEO Searching for " + amendedUrl)
            //TODO: Fix hybord f json p and url hack
            $.getJSON({
                url: amendedUrl,
                crossDomain: true,
                jsonp: f,
                dataType: "json",
                url: amendedUrl,
                data: {
                    format: "json"
                },
                success: function(result){
                    ppCache.add(btoa(amendedUrl),result);
                    console.debug("Received GEO",result);
                    f(result);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("%c Status: %s , Error %s",'background: #CCC; color: #bada55',textStatus,errorThrown);
                }
            });
    }

};



openCageGEO = OpenCageGEO();
