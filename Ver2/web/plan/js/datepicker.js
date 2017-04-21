var DatePicker = function()
{

    //we run a 5 day sim, with 120 hours
    _today = moment().calendar();                      // Today at 9:58 PM
    _day = 0;
    _hour = 24;
    return {
        init: $( function() {
            $("#datepicker").datepicker({
                onSelect: dateChanged
            });
            console.log("Date: " + _today)
        }),

        setDate: function(date){
            _day = date;
            console.log("Date" + _day);
        },
        setHour: function(hour){
            _hour = hour;
            console.log("H: " + _hour)
        },
        getDate: function(){
            return _day;
        },
        getHour: function(){
            return _hour;
        }
    }

}


datePicker = DatePicker();


