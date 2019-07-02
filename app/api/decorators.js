const logger = require("../logger/logger").logger;
const buoys = require("./buoys");
const {csvToJSON, logBuoyData} = require('../utils/format')

exports.elasticDecorator = async (request, reply) => {
   var _json = await new Promise( resolve => {
    buoys.getBuoy(request, (e,r) => resolve(r.body) )
  }).then ( t => {
    return csvToJSON(t).then ( json => {
      logBuoyData(json)
      return json
    })
  })

  return JSON.stringify(_json);
}






