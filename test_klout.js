var Klout = require("node_klout");
var klout = new Klout("nvsyjuzb4fazwgbhx76adgzu"); 

var twitter_screen_name_or_identifier;

klout.getKloutIdentity("SteveMartinToGo", function(error, user){
  klout.getUser(user.id, function(error, klout_user){
    console.log("user object \n");
    console.log(klout_user);
  });

  klout.getUserTopics(user.id, function(error, klout_topics){
    console.log("topicos \n");
    console.log(klout_topics);
  });

  klout.getUserInfluence(user.id, function(error, klout_influence){
    console.log("\nUn influencer");
    //con el influencer se puede rescatar los id de usuarios en klout y asi mismo buscarlos
    console.log(klout_influence);
    console.log(klout_influence);
    console.log(klout_influence.myInfluencers[0].entity);
  });
  
  klout.getUserScore(user.id, function(error, klout_response){
    console.log(klout_response);
  });
 
  klout.getUserNetworkHandle(user.id, function(error, klout){
    console.log(klout);
  });
});

