var _cache = new Map();

var PPCache = function(){
    return{
        contains: function(key){
            return isCached(key);
        },
        add: function(key,val){
            addToCache(key,val);
        }

    }

    function addToCache(key,result){
        console.log("Caching %s",key);
        _cache.set(key,result);
    }

    function isCached(key){
        console.log("Searching for %s",key);
        if(_cache.has(key)){
            return _cache.get(key)
        }else{
            return null
        }
    }
}

ppCache = PPCache();
