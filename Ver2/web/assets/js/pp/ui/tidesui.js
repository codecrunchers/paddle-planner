var TidesUI = function(){

    return {
        activate: function(weather){
            if ( $( "#tides-info-data" ).length ) {
                console.log("Tides Exists");
                 //$("#tides-info-data").empty();
                 $( "#tides-info-data" ).empty();
                 //return;
            }

            var link = document.querySelector('link[rel="import"]');
            // Clone the <template> in the import.
            var template = link.import.querySelector('#tides-template');
            var clone = document.importNode(template.content, true);
            $(clone).prependTo('.container');
        }
    }
}

tidesUi = TidesUI();
