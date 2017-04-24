var UIOverlays = function(){
    overlays = Map;
    var overlayWindOL={obj:null,elementId:"compass",offset:[0,0]};
    var overlaySunOL={obj:null,elementId:"weather-wrapper",offset:[0,0]};
    var overlayInfoOL={obj:null,elementId:"dt-info",offset:[-185,50]};

    return {
        getOverlays: function(){
            return [overlayWindOL,overlaySunOL,overlayInfoOL];
        },
        removeOverlay: function(overlay){
            result = null;
            if(overlay!==null){
                result = map.getMap().removeOverlay(overlay);
            }
            else {
                console.log("No OL Removed from %o",map.getMap());
            }
        }


    };
}

var overlays = UIOverlays();

