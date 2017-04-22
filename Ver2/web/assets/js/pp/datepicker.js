var DatePicker = function()
{

    //we run a 5 day sim, with 120 hours
    _today = moment().calendar();                      // Today at 9:58 PM
    _day = _today
        _hour = moment().hour();
    _datePicker=$("#datepicker")
        return {
            init: $( function() {
                _datePicker.datepicker({
                    onSelect: dateChanged
                });
                _datePicker.datepicker( "option", "showAnim", 'drop' );

                console.log("Date: " + _today)
                    slider.setTo(_hour);
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


