var Warnings = function(){

    return {

        fetch: function(_f){
            warningsProvider.fetch(_f);
        }

    }

}

function testrss(resp){
    console.log(resp);
}


warnings = Warnings();
warningsProvider = Meteoalarm();
warnings.fetch(testrss);
