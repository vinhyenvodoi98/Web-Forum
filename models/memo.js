var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Memo = new Schema({
    userId: String,
    userName: String,
    postId: String,
    title: String,
    text: String,
});

module.exports = mongoose.model('Memo', Memo);
