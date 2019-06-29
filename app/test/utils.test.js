jest.mock('../logger/logger')
const buoyLogger = require("../logger/logger").buoyLogger;
const {csvToJSON, logBuoyData} = require('../utils/format')

const MOCKED_HTTP_RESPONSE = "HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A"
const AS_JSON = '[{"HEAD":"1","HEAD1":"2","HEADER2":"B"},{"HEAD":"2","HEAD1":"3","HEADER2":"A"}]';


test('csv is converted to json', () => {
  return csvToJSON( MOCKED_HTTP_RESPONSE).then(data => {
    expect(JSON.stringify(data)).toBe(AS_JSON);
  });
})

test('csv is converted to json', () => {
  return logBuoyData(AS_JSON).then( () => {
    expect(buoyLogger(.toBeCalled()
  });
})




