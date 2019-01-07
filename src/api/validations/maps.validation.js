const Joi = require('joi');

module.exports = {
  getMarkers: {
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    type: Joi.string().required(),
    limit: Joi.number(),
    radius: Joi.number()
  }
}