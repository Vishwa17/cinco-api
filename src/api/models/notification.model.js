const mongoose = require('mongoose');
const APIError = require('../utils/APIError');

const notification = new mongoose.Schema({
    notificationType: {
        type: String,
        enum: ['newCompany', 'newPromotion', 'message', 'newUser']
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    },
    message: {
        type: String
    },
    userRole: {
        type: String,
        enum: ['user', 'admin']
    }
},
    {
        timestamps: true,
    });

notification.statics = {
    list({
        page = 1,
        perPage = 30,
        notificationType
    }) {
        const options = omitBy({ notificationType }, isNil);

        return this.find(options)
            .populate('companyId')
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();
    },
    getAll(req) {
        return this.find({
            userRole: req.role
        })
            .populate('companyId')
            .sort({ createdAt: -1 })
            .exec()
    }
}

module.exports = mongoose.model('Notification', notification);
