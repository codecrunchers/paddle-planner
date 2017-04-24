var OpenCageGEO = function() {
    var _apiKey = "5a5f067ce860611c5ff659a845afe65c";//oops
    var _apiUrl = " http://api.opencagedata.com/geocode/v1/json?q=_PH_&key="+_apiKey;
    var _cache = new Map();

    return {
        fetchByCoords: function(lon,lat,f){
            console.log("Call GEO")
                var updatedUrl = _apiUrl.replace('_PH_',lon+"+"+lat+"&jsonp="+getFnName(f));
            _key=btoa(updatedUrl);

            if(isCached(_key)!=null){
                console.log("from cache geo");
                result=isCached(_key);
                return result;
            }else{
                console.log("%c geo from service",'background: #aaa; color: #bada55');
                return fetch(updatedUrl, f);
            }

        }
    }

    function getFnName(fn) {
        var f = typeof fn == 'function';
        var s = f && ((fn.name && ['', fn.name]) || fn.toString().match(/function ([^\(]+)/));
        return (!f && 'not a function') || (s && s[1] || 'anonymous');
    }

    function fetch(amendedUrl,f){
        console.log("GEO Searching for " + amendedUrl)
            $.ajax({
                jsonp: "f",
                dataType: "jsonp",
				crossDomain: true,
                url: amendedUrl,
                 data: {
                    format: "json"
                },
                success: function(result){
                    addToCache(btoa(amendedUrl),result);
                    console.debug("GEO",result);
                    console.log("String GEO %s,",result);
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
