
var SunUI= function(){

    return {
        activate: function(sun){
            console.debug("Sun",sun);
            removePrevious();
            var link = document.querySelector('link[rel="import"]');

            // Clone the <template> in the import.
            var template = link.import.querySelector('#sun-template');
            var clone = document.importNode(template.content, true);
            $(clone).prependTo('.container');
            $("#sun").addClass(calcSun(sun));
        }
    }


    function removePrevious(){
        $("weather-wrapper").remove();
    }

    function calcSun(degree){
        return "sun";
    }
}

sunUi = SunUI();
