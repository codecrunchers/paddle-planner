const logger = require("../logger/logger").logger;
var request = require('request');
const LOG_DATA = process.env.LOG_DATA || false

/**
 * Fetch info from MetE daily data
 * @params _request, reply - Fastify 
 * @return csv blob
 *
 */
exports.getBuoyOffline =  async (_request, reply, cb)=> { 
  logger.log({level: "info", message: "DEBUG MODE"});
  return new Promise( resolve => {
    resolve(cb("HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A"))
  })
}

exports.getBuoy = (_request, cb) => {
  try {
    logger.log({level: "info", message: "LIVE MODE"});
    const buoyId  = _request.params.buoyid;
    const updatedUrl = `https://www.met.ie/forecasts/marine-inland-lakes/buoys/download/${buoyId}`;
    logger.log({level: "debug", message: "Fetching URI " , updatedUrl});
    return new Promise( resolve => {
       request.get(updatedUrl, (e,r) => {
        logger.log({level: "debug", message: "IN request CB", e, r});
        resolve( cb(e,r) )
      })
    });
  } catch (err) {
    logger.log({level: "error", message: "!!" , err});
  }
}

