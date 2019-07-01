const logger = require("../logger/logger").logger;
const buoys = require("./buoys");
const {csvToJSON, logBuoyData} = require('../utils/format')

exports.elasticDecorator = async (request, reply) => {
  try {

  return buoys.getBuoy(request, (e, r) => { 
      logger.info("In CB");
      if(e) {
        reply.code(500);
      }else {
        reply.code(200).type("application/json").send(r.body)
      }
    }).then( ()  =>  { return } )

    return ;
  } catch (err) {
    console.log(err)
  }
}


