var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/twitter');

var UserSchema = mongoose.Schema({
    twitter_id : { type: Number },
    twitter_id_str : { type : String },
    name : { type: String },
    screen_name : { type: String },
    statuses_count : { type: Number },
    followers_count : { type: Number },
    friends_count : { type: Number },
    description : { type: String },
    listed_count : { type: Number },
    location : { type : String },
    utc_offset : { type: String },
    timezone : { type : String },
    url : { type : String },
    lang : { type : String },
    created_at : { type : Date },
    verified : { type : Boolean },
    protected : { type : Boolean },
    notifications : { type: Boolean },
    geo_enabled : { type : Boolean },
    default_profile : { type : Boolean },
    default_profile_image : { type : String },
    profile_image_url : { type : String },
    profile_background_title : { type : String },
    is_suspended : { type : Boolean, default : false},
    update_dates : {
        show : { type : Date, default : Date.now }
    },
    peerindex : { 
        score : { type : Number, default : 45.34 },
        audience : { type : Number, default : 45},
        activity : { type : Number, default : 23 },
        demographics : {  
            location : { 
                geoname_id : { type : Number, default : 34 },
                country_code : { type : String, default : "iajsudha" },
                place_type : { type : String, default : "iaud" },
 	        place_name : { type : String, default : "kuydt" },
		country : { type : String, default : "MX" },
	 	latitude : { type : Number, default : 75.2342 },
		longitude : { type : Number, default : 34.54 }
            }
        },
        topics : [Number],
        benchmark_topics : [{ 
            id : Number,
            name : String,
            topic_score : Number
        }],
        graph : {
            influenced_by : [Number],
            influencer_of : [Number]
        },
        update_dates : {
	    extended : { type : Date, default : Date.now },
	    topics : { type : Date, default : Date.now },
	    graph : { type : Date, default : Date.now }
        }
    },
    klout : {
	klout_id : { type : Number },
        topics : [String],
        score : { type : Number },
        graph : {
            influenced_by : [Number],
            influencer_of : [Number]
        },
        update_dates : {
	    score : { type : Date, default : Date.now },
            topics : { type : Date, default : Date.now },
	    graph : { type : Date, default : Date.now }
        },
    },
    voxfeed : {
	score : { type : Number }
    }
});

//DAO Twitter
UserSchema.statics.TwitterFindByScreenName = function TwitterFindByScreenName(screenName, callback){
    Model = this;
    Model.findOne({screen_name :screenName }, function(err, data){
        callback(err, data);  
    });
}; 

UserSchema.statics.TwitterFindById = function TwitterFindById(id, callback){
    this.findOne({twitter_id : id}, function(err, data){
	callback(err, data);
    });
};

UserSchema.statics.TwitterFindIsSuspended = function TwitterFindIsSuspended(id, callback){
    this.findOne({twitter_id : id, is_suspended : true}, function(err, data){
	callback(err, data);
    });
};

UserSchema.statics.TwitterFindBasicInfo = function TwitterFindBasicInfo(id, callback){
    this.findOne({twitter_id : id}, function(err, data){
	var basic_user = {
	    twitter_id : data.twitter_id,
	    screen_name : data.screen_name,
	    followers_count : data.followers_count,
	    description : data.description
	};
	callback(err, basic_user);
    });
};

UserSchema.statics.TwitterFindByIdAndUpdate = function TwitterFindByIdAndUpdate(new_, callback){
    this.findOne({twitter_id : new_.twitter_id}, function(err, data){
        data.twitter_id = new_.twitter_id;
	data.twitter_id_str = new_.twitter_id_str;
	data.name = new_.name;
	data.screen_name = new_.screen_name;
	data.statuses_count = new_.statuses_count;
	data.followers_count = new_.followers_count;
	data.friends_count = new_.friends_count;
	data.description = new_.description;
	data.listed_count = new_.listed_count;
	data.location = new_.location;
	data.utc_offset = new_.utc_offset;
	data.timezone = new_.timezone;
	data.url = new_.url;
	data.lang = new_.lang;
	data.created_at = new_.created_at;
	data.verified = new_.verified;
	data.protected = new_.protected;
	data.notification = new_.notification;
	data.geo_enabled = new_.geo_enabled;
	data.default_profile = new_.default_profile;
	data.default_profile_image = new_.default_profile_image;
	data.profile_image_url = new_.profile_image_url;
	data.profile_background_title = new_.profile_background_title;
	data.is_suspended = new_.is_suspended;
	data.update_dates = new_.update_dates;

	data.save(function(err){
	    callback(err);
	});
    });
};

UserSchema.statics.TwitterFindByIdAndUpdateIsSuspended = function TwitterFindByIdAndUpdateIsSuspended(new_, callback){
    this.findOne({twitter_id : new_.twitter_id}, function(err, data){
	data.is_suspended = new_.is_suspended;
        data.save(function(err){
	    callback(err);
	});
    });
};

UserSchema.statics.TwitterFindByIdAndReturnScreenName = function TwitterFindBydIdAndReturnScreenName(id, callback){
    this.findOne({twitter_id : id}, function(err, data){
        callback(err, data.screen_name);
    }); 
};

//DAO Klout
UserSchema.statics.KloutUpdateId = function KloutUpdateId(screen_name, klout_id, callback){
    this.findOne({screen_name : screen_name}, function(err, user){
	user.klout.klout_id = klout_id;
	user.save(function(err){
	    callback(err);
	});
    });
};

UserSchema.statics.KloutGetId = function KloutGetId(twitter_id, callback){
    this.findOne({twitter_id : twitter_id}, function(err, user){
        callback(err, user.klout.klout_id);
    });
};

UserSchema.statics.KloutAddNameTopics = function KloutAddNameTopics(topics, user, callback){
    topics.forEach(function(topic){
	user.klout.topics.push(topic.displayName);
    });
    user.save(function(err){
        callback(err);
    });
};

UserSchema.statics.KloutAddInfluencersAndInfluencees = function KloutAddInfluencersAndInfluencees(influencers, influencees, user, callback){
    influencers.forEach(function(influence){
	user.klout.graph.influenced_by.push(influence.entity.id);
    });

    influencees.forEach(function(influence){
        user.klout.graph.influencer_of.push(influence.entity.id);
    });
    user.save(function(err){
        callback(err);
    });
};

UserSchema.statics.KloutAddScore = function KloutAddScore(score, user, callback){
    user.klout.score = score;
    user.save(function(err){
        callback(err);
    });
};

UserSchema.statics.KloutGetData = function KloutGetData(twitter_id, callback){
    this.TwitterFindById(twitter_id, function(err, user){
        callback(err, user.klout);
    });
};

UserSchema.statics.KloutGetScore = function KloutGetScore(twitter_id , callback){
    this.TwitterFindById(twitter_id, function(err, user){
        callback(err, user.klout.score);
    });
};

UserSchema.statics.KloutGetTopics = function KloutGetTopics(twitter_id , callback){
    this.TwitterFindById(twitter_id, function(err, user){
        callback(err, user.klout.topics);
    });
};

UserSchema.statics.KloutGetGraph = function KloutGetGraph(twitter_id , callback){
    this.TwitterFindById(twitter_id, function(err, user){
        callback(err, user.klout.graph);
    });
};


//DAO Peer_Index
UserSchema.statics.PeerIndexAddExtended = function PeerIndexAddExtended(twitter_id, data, callback){
    this.TwitterFindById(twitter_id, function(err, user){
	user.peerindex.demographics.location.longitude = data.location.longitude;
	user.peerindex.demographics.location.latitude = data.location.latitude;
	user.peerindex.demographics.location.country_code = data.location.country_code;
	user.peerindex.demographics.location.place_name = data.location.place_name;
	user.peerindex.demographics.location.place_type = data.location.place_type;
	user.peerindex.demographucs.location.geoname_id = data.location.geoname_id;

	user.save(function(err){
	    callback(err);	
	});
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
