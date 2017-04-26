
var Overlays = function(){
    _overlays  = [ sunUi , windUi , tidesUi, infoUi];
    return {
        activate: function(weather){
            _overlays.forEach(function(uiComponent){
                uiComponent.activate(weather);
            });
        }
    }
}

uiOverlays = Overlays();
