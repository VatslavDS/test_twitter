var expect = require('expect.js');
var sinon = require('sinon');
var https = require('https');
var PeerIndex = require('../lib/peerindex');

describe('PeerIndex', function(){

    var pi, piRequest, httpsGet;
    beforeEach(function(){
        pi = new PeerIndex('loremipsum');
        piRequest = sinon.spy(pi, 'request');
        httpsGet = sinon.stub(https, 'get', function(){
            return {on: function(){}};
        });
    });

    afterEach(function(){
        https.get.restore();
    });

    it('should throw error on omitted api key', function(){
        try{
            new PeerIndex();
            throw 'Should not reach this line';
        }catch(e){}
    });

    it('should set defaults on omitted config', function(){
        expect(pi.protocol).to.be('https');
        expect(pi.host).to.be('api.peerindex.com');
        expect(pi.port).to.be(443);
        expect(pi.version).to.be('1');
    });

    it('should set custom config', function(){
        var pi = new PeerIndex('loremipsum', {
            protocol: 'http',
            host: 'example.com',
            port: 80,
            version: '2'
        });
        expect(pi.protocol).to.be('http');
        expect(pi.host).to.be('example.com');
        expect(pi.port).to.be(80);
        expect(pi.version).to.be('2');
    });

    it('should pass pass correct endpoint for actorBasic', function(){
        pi.actorBasic({});
        expect(piRequest.args[0][0]).to.be('/actor/basic');
    });

    it('should pass pass correct endpoint for actorExtended', function(){
        pi.actorExtended({});
        expect(piRequest.args[0][0]).to.be('/actor/extended');
    });

    it('should pass pass correct endpoint for actorTopic', function(){
        pi.actorTopic({});
        expect(piRequest.args[0][0]).to.be('/actor/topic');
    });

    it('should pass pass correct endpoint for actorGraph', function(){
        pi.actorGraph({});
        expect(piRequest.args[0][0]).to.be('/actor/graph');
    });

    it('should use all parameters in request uri', function(){
        pi.actorBasic({foo: 'bar'});
        expect(httpsGet.lastCall.args[0]).to.be('https://api.peerindex.com:443/1/actor/basic?foo=bar&api_key=loremipsum');
    });
});