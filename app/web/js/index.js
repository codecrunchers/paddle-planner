var foo = {}
function retrieveForecast(amendedUrl,f){
	console.log("Searching for " + amendedUrl)
		$.ajax({
			dataType: "json",
			url: amendedUrl,
			success: function(result){
				ppCache.add(btoa(amendedUrl),result);
				if(result.list!=null){
					result = result.list[datePicker.getDateOffset()];
				}
				f(result);
			}
		});
}

function print_result(result){
	console.log(result);
}

$( document ).ready(function() {
        console.log( "ready!" );
        retrieveForecast("",print_result);

});
