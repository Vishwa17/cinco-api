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
    const toSave = {
      "location" : {
        "coordinates" : new Array(parseFloat(req.body.longitude), parseFloat(req.body.latitude)),
        "type" : "Point"
      },
      "icon" : req.body.icon,
      "title" : req.body.title,
      "type" : req.body.type,
      "description": req.body.description
    };
    const location = new Maps(toSave);
    const save = await location.save();
    
    res.status(httpStatus.CREATED);
    res.json(save);
  } catch(err) {
    next(err)
  }
}