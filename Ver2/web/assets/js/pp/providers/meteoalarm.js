var Meteoalarm = function(){

    return {
        fetch: function(_f){
            var _apiUrl = "http://www.meteoalarm.eu/documents/rss/europa.rss";
            var _key=btoa(_apiUrl);

            if(ppCache.contains(_key)!=null){
                console.log("Warnings from cache");
                var result=ppCache.contains(_key);
                _f(result);
            }else{
                console.log("%c Warnings from service",'background: #444; color: #cada55');
                parseRSS(_apiUrl,_f);
            }
        }
    }

    function parseRSS(url, callback) {
        google.load('feeds','1');
        google.setOnLoadCallback(getRSS(url,callback));
    }

    function getRSS(){
        var feed = new google.feeds.Feed(url);
        feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
        feed.load(function(result) {
            if (!result.error) {
                callback(result);
            }
            else{
                console.log("Error from feed %s",result.error);
            }
        });

    }
}




