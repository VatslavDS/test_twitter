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

//DAO
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

UserSchema.statics.TwitterFindByIdAndUpdate = function TwitterFindByIdAndUpdate(id, new_, callback){
    this.findOne({twitter_id : id}, function(err, data){
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

	data.save(function(err){
	    if(err) return handleError(err);
	});
	done(err, data);
    });
};
        
var User = mongoose.model('User', UserSchema);

module.exports = User;
