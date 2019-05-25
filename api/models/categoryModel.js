'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }  
});

mongoose.model('category', categorySchema);