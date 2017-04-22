
var SunUI= function(){

    return {
        activate: function(weather){
            console.debug("Sun",weather);
            removePrevious();
            var link = document.querySelector('link[rel="import"]');
            weatherTemplate = calcSun(weather);
            // Clone the <template> in the import.
            tplName = "#" + weatherTemplate + "-template";
            console.log("fetching tpl %s",tplName);
            var template = link.import.querySelector(tplName);
            var clone = document.importNode(template.content, true);
            $(clone).prependTo('.container');

        }
    }


    function removePrevious(){
        $("weather-wrapper").remove();
    }

    /**
     * sunny-> 904
     * clouds -> 8
    */
    function calcSun(weather){
        console.debug(weather);
        code = parseInt(weather.weather[0].id);
        console.log("Weather Code %s",code);
        switch(code){
            case 800:
                return "sun";
            case 801:
            case 802:
            case 803:
            case 804:
                return "clear";
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 511:
            case 520:
            case 521:
            case 522:
            case 531:
                return "stormy";
            case 904:
                return "supermoon";
            default:
                console.log("%s unknown",code);
                return "cloudy";
        }
    }
}

sunUi = SunUI();
