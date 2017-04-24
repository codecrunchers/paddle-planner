var DatePicker = function()
{

    //we run a 5 day sim, with 120 hours
    var _today = moment().calendar();                      // Today at 9:58 PM
    var _day = _today;
    var _hour = moment().hour();
    var _datePicker=$("#datepicker")
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
            },
            setDateOffset: function(offset){
                console.debug("DatePicker Debug",this.getDate());
                var now = moment(_day.get()).get();
                console.debug("New Date Dbug",this.getDate());

                now.add(parseInt(offset*3), 'hours');
                console.debug("New Time",now);

            }
        }

}


datePicker = DatePicker();


