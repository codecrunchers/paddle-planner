const logger = require("../logger/logger").logger;
var request = require('request');
const LOG_DATA = process.env.LOG_DATA || false

/**
 * Fetch info from MetE daily data
 * @params _request, reply - Fastify 
 * @return csv blob
 *
 */
exports.getBuoy = (_request, cb) => {
  try {
    logger.log({level:"debug", message: 'Entering getBuoy'});
    uri_prefix = "https://www.met.ie/forecasts/marine-inland-lakes/buoys/download/"
    request.get(`${uri_prefix}${_request.params.buoyid}`, cb)
    logger.log({level:"debug", message: 'Exiting getBuoy'});
  } catch (err) {
    logger.log({level: "error", message: "getBuoy Error " , err});
    throw err
  }
}

