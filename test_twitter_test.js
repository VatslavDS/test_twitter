var assert = require("assert");
var mongoose = require('mongoose');
var should = require("should");
var Twit = require('twit');
var Twitter = require("./server.js")(Twit);
var t_dummy;

mongoose.connect('mongodb://localhost/twitter');

var userSchema = mongoose.Schema({
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
     is_suspended : { type : Boolean },
     peerindex_score : { type : Number },
     peerindex_audience : { type : Number },
     peerindex_activity : { type : Number },
     peerindex_authority : { type : Number },
     peerindex_demographics : {
                                 location : { 
                                     geoname_id : { type : Number },
                                     country_code : { type : String },
				     place_type : { type : String },
 				     place_name : { type : String },
			             counry : { type : String },
				     latitude : { type : String },
				     longitude : { type : String }
                                 }
     },
     peerindex_topics : [
       name : { type : Number },
     ],
     peerindex_benchmark_topics : [{
       id : { type : Number },
       name : { type : Number },
       topic_score : { type : Number }
     }],
     peerindex_influenced_by : [Number],
     peerindex_influences_by : [Number],
     klout_topic : [ type : String ],
     klout_score : { type : Number },
     klout_influenced_by : [Number],
     klout_influences_by : [Number]
     
});

var usuario = mongoose.model('users_twitters', userSchema);
var u;
describe('User has', function(){
  beforeEach(function(done){
    usuario.findOne({"name" : "manuel rossi"}, function(err, user){
      u = user;
      done();
    }); 
  });  
  it(' name', function(done){
    console.log(u);
    u.name.should.equal('manuel rossi');
    done();
    });
  it(' id', function(done){
    u.id.should.equal(484944913);
    done();
  });
  it(' screen_name', function(done){
    Twitter.get("users/show", { id: 234234 }, function(err, data, response){
       if(err) console.log(err.message); 
       console.log(data);
       done();
   });
  });
});

describe('Insert User', function(){
  it(' user new', function(done){
     Twitter.get("users/show", { id: 234234 }, function(err, t_dummy, response){
       if(err) console.log(err.message); 
       u = new usuario({
         id : t_dummy.id,
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
         is_suspended : t_dummy.is_suspended
      });
      u.save(function(err, user, response){
        if(err) throw err;
        user.should.have.property("name" , "a self");
      });
	done();
     });
   });
});
