console.log('test!');
var mongoose = require('mongoose');
mongoose.connect('mongodb://'+process.env.IP+'/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});
var kittySchema = mongoose.Schema({
    name: String
});