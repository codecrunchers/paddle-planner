var InfoUI = function(){

    return {
        activate: function(data){
            $("#dt-info").remove();
            console.debug("Info",data);
            var link = document.querySelector('link[rel="import"]');
            // Clone the <template> in the import.
            var template = link.import.querySelector('#info-template');
            var clone = document.importNode(template.content, true);
            $(clone).prependTo('.container');
            $("#dt-info-data").append(updateInfo());
        }
    }

    function updateInfo(){
        var coord = [loc.getLon(),loc.getLat()];
        var template = '{x}N,{y}W ';
        out = ol.coordinate.format(coord, template, 2);
        paddleDate = datePicker.getDate();
        paddleHour = datePicker.getHour();
        var templateDate =  "<br/>" + paddleDate;
        out+= templateDate;
        console.log("OverLayInfo Data: %s ",out);
        return out;

    }

}

infoUi = InfoUI();
