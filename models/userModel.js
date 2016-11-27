var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    alias: String,
    favorites: [{title: String, id: String}]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
