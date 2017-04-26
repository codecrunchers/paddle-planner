var Tides = function(){

    return {
        fetch: function(){
            worldTides.fetch(tidesUpdated);
        }
    }


}

tides = Tides();
worldTides = WorldTides();
