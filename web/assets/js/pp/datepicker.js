var DatePicker = function()
{

    //we run a 5 day sim, with 120 hours
    _today = moment();                      // Today at 9:58 PM
    var _day = _today.get();
    var _hour = 0;
    var _datePicker=$("#datepicker")
        return {
            init: $( function() {
                _datePicker.datepicker({
                    onSelect: dateChanged
                });
                _datePicker.datepicker( "option", "showAnim", 'drop' );

                console.log("Date: " + _today);
                slider.setTo(_hour);
            }),

            setDate: function(date){
                _day = date;
                console.log("Date" + _day);
            },
            getDate: function(){
                return calcOffSet();
            },
            getDateOffset: function(){
                return _hour;
            },
            setDateOffset: function(offset){
                _hour = offset
            }
        }


    function calcOffSet(){
        var now = moment(_day);
        return now.add(parseInt(_hour*3), 'hours');
    }}




datePicker = DatePicker();


