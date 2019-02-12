var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    uid: Number,
    gid: Number
});

module.exports = mongoose.model('User', UserSchema);
