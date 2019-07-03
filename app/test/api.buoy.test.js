jest.mock('request');
jest.mock('fastify');

var buoys = require('../api/buoys');
var request = require('request')


const MOCKED_HTTP_RESPONSE = "HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A"

test('getBuoy returns json version of CSV response', async () => {
  request.get.mockReturnValue(Promise.resolve(MOCKED_HTTP_RESPONSE));  
  params = {params : {buoyid:'M5'}}

  var _json = await new Promise( resolve => {
    buoys.getBuoy(request, (e,r) => resolve(r.body) )
  }).then ( t => {
    console.log("aaln")
    return t;
  })

})


