var Slider = function()
{

    _slider = $("#slider")

        return {
            init: $( function() {
               _slider.slider({
                    value:1,
                    min: 0,
                    max: 40,
                    step: 1,
                    stop: sliderChanged
                });
               _slider.slider("value",0);
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


