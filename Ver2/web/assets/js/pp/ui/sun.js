
var SunUI= function(){

    return {
        activate: function(sun){
            console.debug("Sun",sun);
            var link = document.querySelector('link[rel="import"]');

            // Clone the <template> in the import.
            var template = link.import.querySelector('#sun-template');
            var clone = document.importNode(template.content, true);
            $(clone).prependTo('.container');
            $("#sun").addClass(calcSun(sun));
        }
    }

    function calcSun(degree){
        return "sun";
    }
}

sunUi = SunUI();
