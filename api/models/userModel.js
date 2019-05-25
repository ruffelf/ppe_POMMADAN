'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        require: true
    },
    disable: {
        type: Boolean,
        default: false
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        default: '5c95185b59d9841f3cd6c89c' // utilisateur
    }   
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model('user', userSchema);