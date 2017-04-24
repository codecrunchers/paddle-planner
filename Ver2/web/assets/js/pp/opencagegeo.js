var OpenCageGEO = function() {
    var _apiKey = "5a5f067ce860611c5ff659a845afe65c";//oops
    var _apiUrl = " http://api.opencagedata.com/geocode/v1/json?q=_PH_&key="+_apiKey;
    var _cache = new Map();

    return {
        fetchByCoords: function(f){
            console.log("FBC Call GEO Lon=%s, Lat=%s",loc.getLon(),loc.getLat());
            var updatedUrl = _apiUrl.replace('_PH_',loc.getLon()+"+"+loc.getLat());
            console.log("GEO URL: %s",updatedUrl);
            _key=btoa(updatedUrl);

            if(isCached(_key)!=null){
                console.log("from cache geo");
                result=isCached(_key);
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
                    addToCache(btoa(amendedUrl),result);
                    console.log("GEO Response as Sting: %s",JSON.stringify(result));
                    console.debug("Received GEO",result);
                    f(result);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("%c Status: %s , Error %s",'background: #CCC; color: #bada55',textStatus,errorThrown);
                }
            });
    }

    //tODO: Refactor cache
    function addToCache(key,result){
        console.log("Caching GEO %s",key)
            _cache.set(key,result);
    }

    function isCached(key){
        console.log("Searching for GEO %s",key);
        console.debug(_cache);
        if(_cache.has(key)){
            return _cache.get(key)
        }else{
            return null
        }

    }
};



openCageGEO = OpenCageGEO();
