var mongoose = require("mongoose");
var userSchema = new Mongoose.Schema({
   id : { type: Number, min : 5, max : 10 },
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
     is_suspended : { type : Boolean } 
});

module.exports = mongoose.model('User', userSchema);

  
