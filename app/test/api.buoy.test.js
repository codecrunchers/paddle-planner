jest.mock('request');
jest.mock('fastify');

var buoy = require('../api/buoys');
var request = require('request')


const MOCKED_HTTP_RESPONSE = "HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A"


test('returns stock response in devel mode', () => {
  process.env.DEVEL = 'true';
  return buoy.getBuoy( buoy.getBuoy({params : {buoyid:'M5'}}, null )).then(data => {
    expect(data).toBe(MOCKED_HTTP_RESPONSE);
  });
})

test('returns http call response when env.DEVEL not set', () => {
  process.env = []
  request.get.mockReturnValue(Promise.resolve(MOCKED_HTTP_RESPONSE));
  const fastifyMock = {
    code: jest.fn(x=>{}).mockReturnThis(),
    send: jest.fn(x=>{}).mockReturnThis(),
  };
  return buoy.getBuoy( {params : {buoyid:'M5'}}, fastifyMock).then(data => {
    expect(data).toBe(MOCKED_HTTP_RESPONSE);
  });
})


