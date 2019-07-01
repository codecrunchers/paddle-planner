const logger = require("../logger/logger").logger;
const buoys = require("./buoys");
const {csvToJSON, logBuoyData} = require('../utils/format')

exports.elasticDecorator = async (request, reply) => {
  try {

    await buoys.getBuoy(request, (e, r) => { 
        logger.info("In CB");
        if(e) {
          reply.code(500);
        }else {
          reply.code(200).send(r.body)
        }
      }).then( () => 
        {
          console.log("Done")
          return;
        }
      )
  } catch (err) {
    console.log(err)
  }
}


