
var WindUI = function(){

    return {
       activate: function(data){ 
            console.debug("Wind",data.wind);
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
        dirs = ['n','e','s','w']; //TODO etc /45
        deg = parseInt(degree);
        reduced = deg/90;
        result = dirs[parseInt(reduced)];
        console.log("WD Val: %n",result);
        return result;

    }
}

windUi = WindUI();
