//Returns todays weather
var weatherNow="http://api.openweathermap.org/data/2.5/weather?_PH_&appid=b02e22a57d807e57968f7817363f59b2"

//Return a list object with 40 entries, = 5*8*3 or 5 days by 24hrs at 3hour intervals
var weatherFcast="http://api.openweathermap.org/data/2.5/forecast?q=_PH_&appid=b02e22a57d807e57968f7817363f59b2"


var _cache = new Map();
var paddleTime = { day:"21/04/2017", hour:23 }
$weather = $('#weather-data');
var Ow = function(){
	return {
		getByCoords: function(lon,lat,time){
			var updatedUrl = weatherNow.replace('_PH_',"lon="+lon+"&lat="+lat);
            var layoutFunc = layoutNow;
			_key=btoa(updatedUrl);

			if(isCached(_key)!=null){
				console.log("from cache");
				layoutFunc(isCached(_key));
			}else{
				console.log("from service");
				retrieveForecast(updatedUrl,layoutFunc)
			}
		}
    }



	function retrieveForecast(amendedUrl,f){
		console.log("Searching for " + amendedUrl)
			$.ajax({
				dataType: "json",
				url: amendedUrl,
				success: function(result){
					addToCache(btoa(amendedUrl),result);
					f(result);
				}
			});
	}

	function addToCache(key,result){
			console.log("Caching %s",key)
			_cache.set(key,result);
	}

	function isCached(key){
		console.log("Searching for %s",key);
		console.debug(_cache);
		if(_cache.has(key)){
			return _cache.get(key)
		}else{
			return null
		}

	}
};


var ows = Ow();
