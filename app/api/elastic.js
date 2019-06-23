
const logger = require('../logger/logger').logger

/** Bulk index the Weather data in Elasticsearch */
async function insertWeatherData (title, author, forecast, realtime, esConnection) {
  logger.log({level:"info", message: `esConnection =  ${esConnection.index}`});

  let bulkOps = [] // Array to store bulk operations

  // Add an index operation for each section in the Weather
  for (let i = 0; i < forecast.length; i++) {
    // Describe action
    bulkOps.push({ index: { _index: esConnection.index, _type: esConnection.type } })

    // Add document
    bulkOps.push({
      author,
      title,
      location: i,
      text: forecast[i],
      realtime
    })

    if (i > 0 && i % 500 === 0) { // Do bulk insert in 500 paragraph batches
      await esConnection.client.bulk({ body: bulkOps })
      bulkOps = []
      console.log(`Indexed Paragraphs ${i - 499} - ${i}`)
    }
  }

  // Insert remainder of bulk ops array
  await esConnection.client.bulk({ body: bulkOps })
  console.log(`Indexed Paragraphs ${forecast.length - (bulkOps.length / 2)} - ${forecast.length}\n\n\n`)
}


module.exports = { insertWeatherData }
