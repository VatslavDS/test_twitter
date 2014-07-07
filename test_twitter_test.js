var assert = require("assert");
var User = require("./models/user");
var should = require("should");
var Twit = require('twit');
var Twitter = require("./server.js")(Twit);
var t_dummy;

//Bootstrap current dummy_user

describe('User has', function(){
    beforeEach(function(done){
        var u;
        Twitter.get("users/show", { id: 234234 }, function(err, t_dummy, response){
            u = new User({
                twitter_id : t_dummy.id,
                twitter_id_str : t_dummy.id_str,
                name : t_dummy.name,
                screen_name : t_dummy.screen_name,
                statuses_count : t_dummy.statuses_count,
                followers_count : t_dummy.followers_count,
                friends_count : t_dummy.followers_count,
                description : t_dummy.description,
                listed_count : t_dummy.listed_count,
                location : t_dummy.location,
                utc_offset : t_dummy.utc_offset,
                timezone : t_dummy.timezone,
                url : t_dummy.url,
                lang : t_dummy.lang,
                created_at : t_dummy.created_at,
                verified : t_dummy.verified,
                protected : t_dummy.protected,
                notifications : t_dummy.notification,
                geo_enabled : t_dummy.geo_enabled,
                default_profile : t_dummy.default_profile,
                default_profile_image : t_dummy.default_profile_image,
                profile_image_url : t_dummy.profile_image_url,
                profile_background_title : t_dummy.profile_background_title,
		is_suspended : true
            });
            u.save(function(err, user, response){
            	if(err) throw err;
            	done();
            });
        }); 
    });  
    it('name', function(done){
        User.findOne({"name" : "a self"}, function(err, us){
        us.should.have.property("name", "a self");
        done();
        });
    });
    it('twitter_id', function(done){
        User.findOne({"twitter_id" : 37369271}, function(err, us){
            us.should.have.property("twitter_id" , 37369271);
            done();
        });
    });
    it('screen_name', function(done){
        User.TwitterFindByScreenName("234234", function(err, us){
	    us.should.have.property("screen_name", "234234");
	    done();
	});
    });
    it('twitter_id', function(done){
        User.TwitterFindById(37369271, function(err, us){
	    us.should.have.property("twitter_id", 37369271);
	    done();
	});
    });
    it('is_suspended', function(done){
	User.TwitterFindIsSuspended(37369271, function(err, us){
	    us.should.have.property("is_suspended", true);
	    done();
	});
    });
    it('basic info', function(done){
	User.TwitterFindBasicInfo(37369271, function(err, us){
	    us.should.have.property("twitter_id", 37369271);
	    us.should.have.property("screen_name", 'francesco');
	    us.should.have.property("followers_count", 2);
	    us.should.have.property("description", "");
	    done();
	});
    });
    it('Insert new user', function(done){
        var new_user = new User({
	    twitter_id : 453,
            twitter_id_str : '453',
            name : 'francesco',
            screen_name : 'francesco',
            statuses_count : 45,
            followers_count : 456,
            friends_count : 948,
            description : 'born in italy at the final age',
            listed_count : 857,
            location : 'mx',
            utc_offset : 'string',
            timezone : 'timezone', 
            url : '',
            lang : 'en',
            created_at : Date.now,
            verified : true,
            protected : true,
            notifications : false,
            geo_enabled : true,
            default_profile : true,
            default_profile_image : 'www.string.com',
            profile_image_url : 'www.string.com/image.jpg',
            profile_background_title : 'teletubie',
	    is_suspended : true
        });
        new_user.save(function(err, user){
	    done();
	});
    });
    it('Update user', function(done){
	//We need to figure out the Date format of field created_at doesn`t accept new Date.now
        var update_user = {
	    twitter_id : 37369271,
            twitter_id_str : '453',
            name : 'francesco',
            screen_name : 'francesco',
            statuses_count : 45,
            followers_count : 456,
            friends_count : 948,
            description : 'born in italy at the final age',
            listed_count : 857,
            location : 'mx',
            utc_offset : 'string',
            timezone : 'timezone', 
            url : '',
            lang : 'en',
            created_at : new Date("25 Dec, 1995 23:15:00"),
            verified : true,
            protected : true,
            notifications : false,
            geo_enabled : true,
            default_profile : true,
            default_profile_image : 'www.string.com',
            profile_image_url : 'www.string.com/image.jpg',
            profile_background_title : 'teletubie',
	    is_suspended : true,
	    update_dates : { update_dates : Date.now }
	};
	User.TwitterFindByIdAndUpdate(update_user, function(err){
	    if(err) throw err;
	    done();
	});
    });
    it('Update user field is_suspended', function(done){
	var update_user = {
	    twitter_id : 37369271,
	    is_suspended : false
	};
	User.TwitterFindByIdAndUpdateIsSuspended(update_user, function(err){
	    if(err) throw err;
	    done();
	});
    });	
});

