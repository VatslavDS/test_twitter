var assert = require("assert"),
    User = require("./models/user"),
    should = require("should"),
    Klout = require("node_klout"),
    klout = require("./test_klout")(Klout),
    id_user_klout,
    user_twitter,
    id_twitter = 37369271;

describe('User ', function(){
    beforeEach(function(done){
        klout.getKloutIdentity(37369271, function(err, user){
	    done();
	});
    });
    it('update user klout_id', function(done){
 	User.TwitterFindByIdAndReturnScreenName(37369271, function(err, screen_name){
	    klout.getKloutIdentity(screen_name, function(err, user){
		User.KloutUpdateId(screen_name, user.id, function(err){
		    id_user_klout = user.id;
		    if(err) throw err;
	            done();
   		});
 	    });
        });
    });
    it('present klout topics', function(done){
        User.KloutGetId(37369271, function(err, klout_id){
	    klout.getUserTopics(klout_id, function(err, topics){
		if(err) throw err;
		done();
	    });
  	});
    });
    it('update klout topics', function(done){
        User.KloutGetId(37369271, function(err, klout_id){
	    klout.getUserTopics(klout_id, function(err, topics){
	        User.TwitterFindById(37369271, function(err, user){
		    user_twitter = user;
		    User.KloutAddNameTopics(topics, user, function(err){
			if(err) throw err;
			done();
		    });
		});
	    });
	});
    });
    it('present klout Influence', function(done){
        klout.getUserInfluence(id_user_klout, function(err, klout_influence){
	    console.log(klout_influence);
	    console.log(klout_influence.myInfluencers[0].entity);
	    console.log(klout_influence.myInfluencees[0].entity);
	    done();
	});
    });
    it('update klout influencers and influencees', function(done){
        klout.getUserInfluence(id_user_klout, function(err, klout_influence){
	    User.KloutAddInfluencersAndInfluencees(klout_influence.myInfluencers, klout_influence.myInfluencees, user_twitter, function(err){
	        if(err) throw err;
	        done();
	    });
        });
    });
    it('update klout score', function(done){
        klout.getUserScore(id_user_klout, function(err, score){
	    User.KloutAddScore(score.score, user_twitter, function(err){
		if(err) throw err;
		done();
	    });
	});
    });
    it('get klout info', function(done){
	User.KloutGetData(id_twitter, function(err, klout_data){
	    if(err) throw err;
	    console.log(klout_data);
	   done();
	});
    });
    it('get klout score', function(done){
	User.KloutGetScore(37369271, function(err, score){
	    if(err) throw err;
	    done();
        });
    });
    it('get klout toics', function(done){
	User.KloutGetTopics(37369271, function(err, topics){
	    if(err) throw err;
	    console.log(topics);
	    done();
	});
    });
    it('get klout graph', function(done){
	User.KloutGetGraph(37369271, function(err, graph){
	    if(err) throw err;
	    console.log(graph);
	    done();
	});
    });
    
});
