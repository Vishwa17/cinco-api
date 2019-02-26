const express = require('express');
const controller = require('../../controllers/notification.controller');
const router = express.Router();
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const validate = require('express-validation');

router.route('/getAll')
    .post(authorize(), controller.getAll);

module.exports = router;