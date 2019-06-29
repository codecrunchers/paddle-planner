jest.mock('fastify');
var buoy = require('../api/buoys');
var fastify = require('fastify');


const MOCKED_HTTP_RESPONSE = "HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A"


test('returns stock response in devel mode', () => {
  process.env.DEVEL = 'true';
  fastify.mockReturnValue(Promise.resolve(MOCKED_HTTP_RESPONSE));
  mockReply = { code: 0, send: d => {console.log(d)}}
  return buoy.getBuoy( buoy.getBuoy({params : {buoyid:'M5'}}, mockReply) ).then(data => {
    expect(data).toBe(MOCKED_HTTP_RESPONSE);
  });
})

