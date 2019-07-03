jest.mock('../api/buoys')
jest.mock('../logger/logger')
jest.mock('../utils/format')

const { elasticDecorator  }= require("../api/decorators")
const buoys = require('../api/buoys')
const {csvToJSON, logBuoyData} = require('../utils/format')

const MOCKED_HTTP_RESPONSE = "HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A"

test('elastic decorator logs response as json and returns json', () => {
  const fastifyMock = {
    code: jest.fn(x=>{}).mockReturnThis(),
    send: jest.fn(x=>{}).mockReturnThis(),
  };  

  _request = {params : {buoyid:'M6'}}
  return elasticDecorator(_request,fastifyMock).then(data => {
    expect(csvToJSON).toBeCalled()
    expect(logBuoyData).toBeCalled()
    expect(buoys.getBuoy).toBeCalledWith(_request, fastifyMock)
  });

})



 
