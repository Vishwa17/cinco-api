const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const verificationRoutes = require('./verify.route');
const generationRoutes = require('./generate.route');
const mapRoutes = require('./map.route');
const imagesUpload = require('images-upload-middleware');
const { logs, ipAddress, port } = require('../../../config/vars');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));
router.post('/multiple', imagesUpload.default(
    './server/static/multipleFiles',
    ipAddress + ':' + port + '/static/multipleFiles',
    true
));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/verify', verificationRoutes);
router.use('/generate', generationRoutes);
router.use('/map', mapRoutes);

module.exports = router;
