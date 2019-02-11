const Maps = require('../models/maps.model');
const { handler: errorHandler } = require('../middlewares/error');
const httpStatus = require('http-status');

exports.getMapMarkers = async (req, res, next) => {
  try {
    const markers = await Maps.list(req.body);
    res.json(markers);
  } catch(error) {
    next(error)
  }

}

exports.addNewLocation = async (req, res, next) => {
  try {
    req.body['location'] = {
      coordinates: new Array(parseFloat(req.body.longitude), parseFloat(req.body.latitude)),
      type: 'Point'
    }
    const location = new Maps(req.body);
    const save = await location.save();
    
    res.status(httpStatus.CREATED);
    res.json(save);
  } catch(err) {
    next(err)
  }
}

exports.findMultiple = async (req, res, next) => {
  try {
    const locations = await Maps.FindMultiple(req.body.ids);
    res.json(locations);

  } catch(err) {
    next(err);
  }
}