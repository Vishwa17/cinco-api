const Maps = require('../models/maps.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.getMapMarkers = async (req, res, next) => {
  console.log('req, res, next', req.body);
  try {
    const markers = await Maps.list(req.body);
    res.json(markers);
  } catch(error) {
    next(error)
  }

}