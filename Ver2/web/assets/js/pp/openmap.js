
var MapMaker = function() {
    var _map;
    var _paddler;

    return {
        createOSMap: function (lon, lat, zoom)
        {
            loc.setLon(lon);
            loc.setLat(lat);
            var markerLayer = new ol.layer.Vector({
                source: new ol.source.Vector({ features: [], projection: 'EPSG:4326' })
            });

            var baseLayer = new ol.layer.Tile( {
                source: new ol.source.OSM()
            });

            _map = new ol.Map({
                target: 'openmap',  // The DOM element that will contains the map
                renderer: 'canvas', // Force the renderer to be used
                layers: [ baseLayer, markerLayer ],
                view: new ol.View({
                    center:  ol.proj.transform([lat , lon], 'EPSG:4326', 'EPSG:3857'),
                    zoom: zoom
                })
            });
        },

        getMap: function(){
            return _map;
        },
        jumpTo: function(lon, lat) {
            view = _map.getView();
            view.setCenter(ol.proj.transform([lat,lon], 'EPSG:4326', 'EPSG:3857'));
            map.addMarker("PaddlingArea",lon,lat);
            return false;
        },

        addMarker: function(id, lon, lat)
        {
            //create a point
            if(_paddler!=undefined){
                console.debug("Paddler Marker",_paddler);
                geom = new ol.geom.Point(ol.proj.transform([lat,lon], 'EPSG:4326', 'EPSG:3857') );
                _paddler.setGeometry(geom);
            }else{
                console.log("Paddler Marker is : %s",_paddler);

                geom = new ol.geom.Point(ol.proj.transform([lat,lon], 'EPSG:4326', 'EPSG:3857') );
                _paddler = new ol.Feature(geom);
                _paddler.setStyle([
                        new ol.style.Style({
                            image: new ol.style.Icon(({
                                anchor: [0.5, 1],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'fraction',
                                opacity: 1,
                                src: 'assets/images/paddler.png'
                            }))
                        })
                ]);

                if (id != null)
                {
                    _paddler.setId(id);
                }

                _map.getLayers().item(1).getSource().addFeature(_paddler);
            }
        },
        getView: function(){
            return _map.getView();
        },
        setZoom: function(zoom){
            _map.getView().setZoom(parseInt(zoom));
        },
        activateOverlays: function(){
            console.debug("Overlay",overlays.getOverlays());
            overlays.getOverlays().forEach(function(olObj){
                console.debug("Overlay to be activated",olObj.obj);
                overlays.removeOverlay(olObj.obj);

                weatherOl = new ol.Overlay({
                    element: document.getElementById(olObj.elementId),
                    position: ol.proj.fromLonLat( [loc.getLat(), loc.getLon()] )
                });

                weatherOl.setOffset(olObj.offset);
                _map.addOverlay(weatherOl);
                olObj.obj = weatherOl;
            });

        }
    }

}


