var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    userId: String,
    userName: String,
    title: String,
    text: String,
});

module.exports = mongoose.model('Post', Post);
