const logger = require("../logger/logger").logger;
var request = require('request');
const LOG_DATA = process.env.LOG_DATA || false

exports.getBuoy = async (_request, reply)=> {
  let response;
  logger.log({level: "info", message: `DEVEL >>>  ${process.env.DEVEL}`});
  logger.log({level: "info", message: `DEVEL Reply Obj>>>  ${reply}`, reply});


  if(process.env.DEVEL){
    logger.log({level: "info", message: `DEBUG MODE`});
    response = `HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A`;
    console.log(reply);
    //reply.code(418).send(response)
  }
  else{    
    logger.log({level: "info", message: `LIVE MODE`});
    //reply.header('Content-Type', 'application/json').code(200)
    response = fetch(_request);
    reply.code(200).send(response)

  }  
  //logData(response);
  return response;
}

const fetch  = async (_request) => {
  try   {
    logger.log({level: "info", message: `Fetching Buoy Data ${request.params}`});
    const buoyId  = _request.params.buoyid;
    const updatedUrl = `https://www.met.ie/forecasts/marine-inland-lakes/buoys/download/${buoyId}`;
    logger.log({level: "info", message: `Fetching Buoy Data from ${updatedUrl}`});

    return  await request.get(updatedUrl, 
      function(err,response,body) {
        data = ""
        if(err || response.statusCode != 200){
          logger.log({level:'error' ,'message': "Body ", response});
          throw err
        }else{
          logger.log({level:'info','message': "Weather Call Good"});
          logger.log({level:'debug','message': "Response Body: " + body});
          data = body;
        }
        return data
      }
    );
  }catch(err){
    throw err;
  }
}
