'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VehicleSchema = new Schema({
    registration: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        require: true
    },
    disable: {
        type: Boolean,
        default: false
    },
    energy: String,
    range: Number,
    place: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
});

module.exports = mongoose.model('vehicle', VehicleSchema);