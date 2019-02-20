const mongoose = require('mongoose');
const APIError = require('../utils/APIError');

const settingsSchema = new mongoose.Schema({
    northLatitude: {
        type: Number
    },
    southLatitude: {
        type: Number
    },
    centerLatitude: {
        type: Number
    },
    islandsLatitude: {
        type: Number
    },
    northLongitude: {
        type: Number
    },
    southLongitude: {
        type: Number
    },
    centerLongitude: {
        type: Number
    },
    islandsLongitude: {
        type: Number
    },
})

module.exports = mongoose.model('Settings', settingsSchema);
