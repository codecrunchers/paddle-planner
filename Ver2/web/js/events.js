map.getMap().on('click', function(evt) { 
    var click_coordinates = evt.coordinate;
    console.log(click_coordinates);
});

map.getMap().on('changed', function(evt) { 
    console.log("sadsa");
});

console.debug(map.getMap());



