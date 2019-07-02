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
    uri_prefix = "https://www.met.ie/forecasts/marine-inland-lakes/buoys/download/"
    //"https://cloud.snarfel.com:9633/"//
    logger.log({level: "info", message: "LIVE MODE", uri_prefix});
    request.get(`${uri_prefix}${_request.params.buoyid}`, cb)
  } catch (err) {
    logger.log({level: "error", message: "getBuoy Error " , err});
  }
}

