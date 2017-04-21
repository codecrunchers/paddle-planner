var Slider = function()
{

    _slider = $("#slider")

        return {
            init: $( function() {
               _slider.slider({
                    value:120,
                    min: 0,
                    max: 120,
                    step: 1,
                    slide: sliderChanged
                });
               _slider.slider("value",0);
            } ),

            getSlider: function(){
                return _slider.slider;
            },

            reset: function(){
                _slider.slider("value",0);
            }

        }

}

slider = Slider()


