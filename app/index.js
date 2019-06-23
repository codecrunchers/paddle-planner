const tides = require("./api/tides");
const geo = require("./api/geo");
const weather = require("./api/weather");
const buoys = require("./api/buoys");
const buoySvc = require("./services/buoydata");
const logger = require("./logger/logger").logger;
const elastic =  require("./services/elastic");

const RESET_INDEX = process.env.RESET_INDEX || false;
const SERVER_PORT = process.env.PORT || 3000;
const BUOYDATA_ENABLED = process.env.BUOYDATA_ENABLED || false;

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })


fastify.route({
  method: 'GET',
  url: '/weather/:latitude/:longtitude/:utc_timestamp',
  schema: {
    querystring: {
      latitude: { type: 'string' },
      longtitude: { type: 'string' }     
    },
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
  },
  handler: weather.getWeather,  
})


fastify.route({
  method: 'GET',
  url: '/tides/:latitude/:longtitude/:utc_timestamp/:days',
  schema: {
    querystring: {
      latitude: { type: 'string' },
      longtitude: { type: 'string' }     
    },
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
  },
  handler: tides.getTides,  
})


//buoy
// Geo
fastify.route({
  method: 'GET',
  url: '/buoys/:buoyid',
  schema: {
    querystring: {
      buoyid: { type: 'string' },
    },
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
  },
  handler: buoys.getBuoy,
})




// Geo
fastify.route({
  method: 'GET',
  url: '/geo/:address',
  schema: {
    querystring: {
      address: { type: 'string' },
    },
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
  },
  handler: geo.getGeo,  
})




// 
fastify.route({
  method: 'GET',
  url: '/geo/:latitude/:longtitude',
  schema: {
    querystring: {
      latitude: { type: 'string' },
      longtitude: { type: 'string' }     
    },
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
  },
  handler: geo.getGeo,  
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

    await elastic.checkConnection();
    
    if(RESET_INDEX)
      await elastic.resetIndex();

    if(BUOYDATA_ENABLED) 
      await buoySvc.start();    

    await fastify.listen(SERVER_PORT);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
    //test
  } catch (err) {
    fastify.log.error(err);
    logger.log( {level: "error", message: `Connection Failed, Retrying...${err}`} );
    process.exit(1);
  }
}
start()

