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
