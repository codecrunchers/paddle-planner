
var WindUI = function(){

    return {
       activate: function(data){
            console.debug("Wind",data.wind);
            $(".compass").remove();
            var link = document.querySelector('link[rel="import"]');

            // Clone the <template> in the import.
            var template = link.import.querySelector('#wind-template');
            var clone = document.importNode(template.content, true);
            $(clone).prependTo('.container');
            wDir = calcWind(data.wind.deg);
            $(".speedk").prepend(data.wind.speed + " ");
            $(".wind-speed-val").prepend(wDir.toUpperCase() + " ");
            $("#arrow").addClass(calcWind(data.wind.deg));
        }
    }

    function calcWind(degree){
        dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];
        index = degree % 360
        index = parseInt(index/ 22.5) + 1
        result= dirs[index];
        console.log("WD Val: %s",result);
        return result;

    }
}

windUi = WindUI();
