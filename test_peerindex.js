var PeerIndexClient = require('peerindex');
//module.exports = function(PeerIndexClient){
  var api = new PeerIndexClient('kw34v5vptnyd9gxafd7r82th');
  var query = { twitter_screen_name : 'azeem' };

  api.actorExtended(query, function(actor, result){
    console.log(result);
  });

  api.actorTopic(query, function(actor, result){
    console.log(result);
  });

  api.actorGraph(query, function(actor, result){
    console.log(result.influenced_by[0].twitter.id);
  });
   
