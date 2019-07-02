const logger = require("../logger/logger").logger;
const buoys = require("./buoys");
const {csvToJSON, logBuoyData} = require('../utils/format')

exports.elasticDecorator = async (request, reply) => {
  var res = await new Promise( resolve => {
    buoys.getBuoy(request, (e,r) => resolve(r.body) )
  })

  var json = await new Promise( resolve => {
     csvToJSON(res).then( j=> {
       console.log(j) 
       resolve(j)
     })
  })

  return JSON.stringify(json)
    
}





