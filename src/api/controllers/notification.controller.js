const Notification = require('../models/notification.model');

exports.create = async (req, res, next) => {
    try {
        const noti = new Notification(obj);
        res.status(httpStatus.CREATED);
        res.json(noti);
    } catch (error) {
        next(error);
    }
    
};

exports.getList = async (req, res, next) => {
    try {
        const noti = await Notification.list(req.body);
        res.json(noti);
    } catch (err) {
        next(err);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const noti = await Notification.getAll(req.body);
        res.json(noti);
    } catch(err) {
        next(err);
    }
}