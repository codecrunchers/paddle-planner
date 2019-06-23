const elasticsearch = require('elasticsearch')
const elasticapi = require('../api/elastic')
const logger = require('../logger/logger').logger




// Core ES variables for this project
const index = 'weather'
const port = 9200
const host = process.env.ES_HOST || 'localhost'
const client = new elasticsearch.Client({ host: { host, port } })

/** Clear the index, recreate it, and add mappings */
async function resetIndex () {
  if (await client.indices.exists({ index })) {
    logger.log({level:"info", message: `about to delete index ${index}`});
    await client.indices.delete({ index })
  }

  logger.log({level:"info", message: `about to create index ${index}`});
  await client.indices.create({ index })
 logger.log({level:"info", message: `about to create schema`});

  await putWeatherStationMapping()
}

/** Add book section schema mapping to ES */
async function putWeatherStationMapping () {
    const schema = {
          title: { type: 'keyword' },
          author: { type: 'keyword' },
          location: { type: 'integer' },
          text: { type: 'text' },
          realtime: { type: 'boolean' }
        }
  
    return client.indices.putMapping({ index, body: { properties: schema } })
}


/** Check the ES connection status */
async function checkConnection () {
  let isConnected = false
  while (!isConnected) {
    console.log('Connecting to ES')
    try {
      const health = await client.cluster.health({})
      console.log(health)
      isConnected = true
    } catch (err) {
      console.log('Connection Failed, Retrying...', err)
    }
  }
}


const insertWeatherData = elasticapi.insertWeatherData;
module.exports = { resetIndex, checkConnection, client, insertWeatherData , index}
