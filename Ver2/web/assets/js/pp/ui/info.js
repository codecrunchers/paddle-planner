var InfoUI = function(){

    return {
        activate: function(data){
            console.debug("Info",data);
            var link = document.querySelector('link[rel="import"]');

            // Clone the <template> in the import.
            var template = link.import.querySelector('#info-template');
            var clone = document.importNode(template.content, true);
            $(clone).prependTo('.container');
        }
    }
}

infoUi = InfoUI();
