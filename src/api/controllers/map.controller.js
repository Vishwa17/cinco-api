const Maps = require('../models/maps.model');
const { handler: errorHandler } = require('../middlewares/error');
const httpStatus = require('http-status');
const Promotions = require('../models/promotions.model');
const _ = require('lodash');

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

exports.search = async (req, res, next) => {
  try {
    const locations = await Maps.search(req.body.text, req.body.locationType, req.body.exact);
    res.json(locations);
  } catch(err) {
    next(err)
  }
}

exports.insertMany = async (req, res, next) => {
  try {
    console.log('insert', req.body.insert);
    const locations = await Maps.inserts(req.body.insert);
    res.json(locations);
  } catch(err) {
    next(err);
  }
}

exports.getPromotions = async (req, res, next) => {
  try {
    const promotions = await Promotions.getLatest();
    res.status(httpStatus.OK);
    res.json(promotions);
  } catch(err) {
    next(err);
  }
}

exports.addCommentToCompany = async (req, res, next) => {
  try {
    const comment = await Maps.addComment(req.body);
    res.status(httpStatus.OK);
    res.json(comment);
  } catch (err) {
    next(err);
  }
}

exports.getAllCompanies = async (req, res, next) => {
  try {
    let companies = await Maps.getAllCompanies();
    res.status(httpStatus.OK);
    res.json(companies);
  } catch (err) {
    next(err);
  }
}