const moch = require("mocha");
const chai = require("chai");
var sinon = require('sinon');
var expect = chai.expect;
var buoy = require('../api/buoys.js');


describe('buoyData', function () {

  it('emulate call if in debug mode', async function () {
    process.env.DEVEL=Boolean(true)
    buoyReply = await buoy.getBuoy({},{});
    expect(buoyReply).to.be.equal("HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A")
  });
  

  it('doesn\'t emulate call if in debug mode', async function () {
    process.env=[]
    var save = sinon.spy(buoy, 'getBuoy');
    var fake = sinon.spy(buoy, 'getBuoy._fetch');

    buoyReply = await buoy.getBuoy({ params: { buoyid:"M5"}},{});    
    save.restore();
    sinon.assert.calledOnce(save);
    sinon.assert.calledOnce(fetch);
//    expect(buoyReply).to.be.equal("HEAD,HEAD1,HEADER2\r\n1,2,B\r\n2,3,A")
  });

});
