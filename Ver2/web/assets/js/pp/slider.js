var Slider = function()
{

    _slider = $("#slider")

        return {
            init: $( function() {
                _slider.slider({
                    value:0,
                    min: 0,
                    max: 40,
                    step: 1,
                    stop: sliderChanged
                })
                .each(function() {
                    var opt = $(this).data().uiSlider.options;
                    var vals = opt.max - opt.min;
                    for (var i = 0; i <  vals; i++) {
                        _i  = i
                        _i = ((_i+1)*3);
                        modRem = parseInt(_i / 24)
                        console.log("Day %s",modRem);
                        displayHour = _i - (modRem*24);
                        var el = $('<label>'+displayHour+'</label>').css('left',(i/vals*100)+'%');
                        $( "#slider" ).append(el);
                    }

                });

                _slider.slider("value",10);
            } ),

            getSlider: function(){
                return _slider.slider;
            },

            reset: function(){
                _slider.slider("value",0);
            }, 
            setTo:  function(val){
                _slider.slider("value",val);
            }
        }

}

slider = Slider()


