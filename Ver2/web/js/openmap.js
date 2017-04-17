
var MapMaker = function() {
    var map;


    return {
        createOSMap: function (lon, lat, zoom)
        {
            var markerLayer = new ol.layer.Vector({
                source: new ol.source.Vector({ features: [], projection: 'EPSG:4326' })
            });

            var baseLayer = new ol.layer.Tile( {
                source: new ol.source.OSM()
            });

            map = new ol.Map({
                target: 'map',  // The DOM element that will contains the map
                renderer: 'canvas', // Force the renderer to be used
                layers: [ baseLayer, markerLayer ],
                view: new ol.View({
                    center:  ol.proj.transform([lon, lat ], 'EPSG:4326', 'EPSG:3857'),
                    zoom: zoom
                })
            });
        },


        jumpTo: function(lon, lat, zoom) {
            view = mymap.getView();
            view.setCenter(ol.proj.transform([lon,lat], 'EPSG:4326', 'EPSG:3857'));
            mymap.addMarker("Galway",lon,lat);
            return false;
        },

        addMarker: function(id, lon, lat)  
        {
            //create a point
            var geom = new ol.geom.Point( ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857') );
            var feature = new ol.Feature(geom);
            feature.setStyle([
                    new ol.style.Style({
                        image: new ol.style.Icon(({
                            anchor: [0.5, 1],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            opacity: 1,
                            src: 'https://openlayers.org/en/v3.19.1/examples/data/icon.png'
                        }))
                    })
            ]);

            if (id != null)
            {
                feature.setId(id);
            }

            map.getLayers().item(1).getSource().addFeature(feature);
        },
        getView: function(){
            return map.getView();
        }
    }

};

mymap = MapMaker();
mymap.createOSMap(-9.043876, 53.267111, 16);



