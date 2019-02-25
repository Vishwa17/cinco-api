const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const deleteUserSchema = new mongoose.Schema({
    email: String,
    reason: String
});

module.exports = mongoose.model('DeleteUser', deleteUserSchema);