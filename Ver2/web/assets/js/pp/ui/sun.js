
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
            $("#sun").addClass();
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
        code = parseInt(weather.weather[0].id / 100);
        console.log("Weather Code %s",code);
        switch(code){
            case 8:
                return "cloudy";
            default:
        }        return "sun";
    }
}

sunUi = SunUI();
