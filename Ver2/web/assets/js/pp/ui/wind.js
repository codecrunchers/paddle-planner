
var WindUI = function(){

    return {
        activate: function(wind){ 
            console.debug("Wind: %o",wind);
            var link = document.querySelector('link[rel="import"]');

            // Clone the <template> in the import.
            var template = link.import.querySelector('#wind');
            var clone = document.importNode(template.content, true);
//          document.querySelector('.container').appendChild(clone);
            $(clone).prependTo('body');
            //$(".wind-speed-val").text(wind.speed);
            //$(".wind-speed-val").addClass("wd-n");

        }
    }

    
};

windUi = WindUI();
