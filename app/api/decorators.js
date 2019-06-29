const buoys = require("./buoys");
const {csvToJSON, logBuoyData} = require('../utils/format')

exports.elasticDecorator = async (request, reply) => {
  const asCSV =  await buoys.getBuoy(request, reply);
  const asJSON =  csvToJSON(asCSV)
  logBuoyData(asJSON)
  return asJSON
}


