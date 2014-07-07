var Klout = require("node_klout");
var klout = new Klout("nvsyjuzb4fazwgbhx76adgzu"); 

module.exports = function(Klout){
    var klout = new Klout("nvsyjuzb4fazwgbhx76adgzu");
    
    //Exposed methods
    /*
    klout.getKloutIdentity(14824849, function(error, user){
        klout.getUser(user.id, function(error, klout_user){
            console.log("user object \n");
            console.log(klout_user);
        });

        klout.getUserTopics(user.id, function(error, klout_topics){
            console.log("topics \n");
            console.log(klout_topics);
        });

        klout.getUserInfluence(user.id, function(error, klout_influence){
            console.log("\nUn influencer");
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
   */

   return klout;
};    
