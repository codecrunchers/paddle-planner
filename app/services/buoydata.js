const cron = require("node-cron");
const logger = require("../logger/logger").logger;
const buoys = require("../api/buoys");

const getBuoyData = async () => {
  logger.log({level: "info", message: `Fetching Buoy Data`});
  var kinsale = {}
  cron.schedule('0 * * * * *', () => {
    // code
    const request = { params: { buoyid: "KINSALE"}};
    kinsale = buoys.getBuoy(request);
  });

  return { kinsaleBuoy: kinsale};
}

exports.start = async () => getBuoyData();





