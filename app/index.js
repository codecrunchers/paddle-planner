const tides = require("./api/tides");
const logger = require("./logger/logger").logger;

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })


fastify.route({
  method: 'GET',
  url: '/tides/:latitude/:longtitude',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      latitude: { type: 'string' },
      longtitude: { type: 'string' }     
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          results: { type: 'string' }
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    logger.log({level:"info", message: request.params });
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return {};//tides.getTides(request);
  }
})

// Declare an API route
fastify.get('/', async (request, reply) => {
  return { links: '/tides' }
})


// API route - ""
fastify.get('/tides/1', async (request, reply) => {
  return tides.getTides(request,reply);
})


// Run the server!
const start = async () => {
  
  logger.log({ level: 'info', message: 'Starting'});
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

