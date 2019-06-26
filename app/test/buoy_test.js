const moch = require("mocha");
const chai = require("chai");
var sinon = require('sinon');
var expect = chai.expect;
var buoy = require('../api/buoys.js');
var request = require('request');

describe('buoyData', function () {
  const responseObject = {
    statusCode: 200,
    headers: {
      'content-type': 'application/json'
    }
  };
   const responseBody = {
      status: 'success',
      data: [
        {
          id: 4,
          name: 'The Land Before Time',
          genre: 'Fantasy',
          rating: 7,
          explicit: false
        },
      ]
    };

  it('emulate call if in debug mode', async function () {
    process.env.DEVEL=Boolean(true)
    var buoyReply = await buoy.getBuoy({},{});
    expect(buoyReply).to.be.equal("HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A")
  });  

    before((done) => {
      sinon.stub(request, 'get').yields(null, {statusCode: 200}, 'foo')
      done()
    });
    after((done) => {
      request.get.restore();
      done()
    });


  it('calls www.met.ie/forecasts/marine-inland-lakes/buoys/download/??', async function () {    
    process.env=[]
    buoyReply = await buoy.getBuoy({ params: { buoyid:"M5"}},{});
    expect(buoyReply).to.be.equal("foo");

  });

});
