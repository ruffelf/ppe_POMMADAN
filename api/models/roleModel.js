'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var roleSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }  
});

mongoose.model('role', roleSchema);