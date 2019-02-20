const express = require('express');
const controller = require('../../controllers/map.controller');
const router = express.Router();
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const validate = require('express-validation');
const { getMarkers } = require('../../validations/maps.validation');
/**
 * @api {post} v1/map/getMapMarkers Get map markers
 * @apiDescription Get nearby map markers
 * @apiVersion 1.0.0
 * @apiName getMapMarkers
 * @apiGroup Map
 * @apiPermission user
 *
 * @apiParam  {String}          lat     User's latitude
 * @apiParam  {String}          lng     User's longitude
 * @apiParam  {String}          type    Place type
 * @apiParam  {Number}          limit   number of markers
 * @apiParam  {Number}          radius  radius from user
 *
 * @apiSuccess (Created 200) {points}    markers
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/getMapMarkers')
  .post(authorize(), controller.getMapMarkers);

/**
 * @api {post} v1/map/addNewLocation Add new map markers
 * @apiDescription Add new nearby map markers
 * @apiVersion 1.0.0
 * @apiName addNewLocation
 * @apiGroup Map
 * @apiPermission user
 *
 * @apiParam  {String}          type    Place type
 * @apiParam  {Number}          location   {coordinates: [longitude, latitude]}
 * @apiParam  {Number}          title   Location title  
 * @apiParam  {Number}          description   Location description  
 * @apiParam  {Number}          icon   Location icon  
 *
 * @apiSuccess (Created 200) {points}    markers
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/addNewLocation')
  .post(authorize(ADMIN), controller.addNewLocation);

router.route('/findMultiple')
  .post(authorize(), controller.findMultiple);

  router.route('/search')
  .post(authorize(), controller.search);

router.route('/insertMany')
  .post(authorize(ADMIN), controller.insertMany);


module.exports = router;
