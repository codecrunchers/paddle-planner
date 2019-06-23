const cron = require("node-cron");
const logger = require("../logger/logger").logger;
const buoys = require("../api/buoys");
const elastic = require("../services/elastic");


const getBuoyData = async () => {
  logger.log({level: "info", message: `Fetching Buoy Data`});
  var kinsale = {error: "true"}
  const request = { params: { buoyid: "KINSALE"}};

  cron.schedule('0 * * * * *', async () =>  {
    // code
    kinsale = await buoys.getBuoy(request);
    logger.log({level: "info", message: `Sending ${kinsale}`});
    elastic.insertWeatherData("KINSALE_BUOY", "MET_Eireann", kinsale, true, elastic);
    logger.log({level: "info", message: `Fetched  Buoy Data for ${request} = ${kinsale}`});
  });




}

exports.start = async () => getBuoyData();





