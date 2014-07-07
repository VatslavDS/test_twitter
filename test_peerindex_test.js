var assert = require("assert"),
    User = require("./models/user"),
    should = require("should"),
    PeerIndexClient = require("peerindex"),
    PeerIndex = require("./test_peerindex")(PeerIndexClient),
    twitter_id = 37369271,
    screen_name,
    user_twitter;

describe('User ', function(){
    beforeEach(function(done){
        User.TwitterFindById(twitter_id, function(err, user){
	    user_twitter = user;
	    console.log(user_twitter);
	    done();
	});
    });
    it('present', function(done){
	console.log(user_twitter);
	done();
    });
    it('has actor extended data', function(done){
        User.TwitterFindByIdAndReturnScreenName(twitter_id, function(err, screen_name){
	    screen_name = screen_name;
            PeerIndex.actorExtended({twitter_screen_name : screen_name}, function(actor, result){
	        console.log(result);
		done();
	    });
	});
    });
    it('save actor extended data', function(done){
        PeerIndex.actorExtended({twitter_screen_name : screen_name}, function(actor, result){
	    console.log(result);
	    User.PeerIndexAddExtended(twitter_id, result, function(err){
		if(err) throw err;
	        done();
            });
        });
    });
});
        
	
