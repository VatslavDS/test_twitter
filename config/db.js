var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/twitter");

var connection = mongoose.connection;

