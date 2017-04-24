var TidesUI = function(){

    return {
        activate: function(tides){
            $("#tides-info").remove();
            console.debug("Tides",tides);
            var link = document.querySelector('link[rel="import"]');
            // Clone the <template> in the import.
            var template = link.import.querySelector('#tides-template');
            var clone = document.importNode(template.content, true);
            $(clone).prependTo('.container');
            $("#tides-info-data").append($("<span>alan</span>"));

        }
    }
}

tidesUi = TidesUI();
