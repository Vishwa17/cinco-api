const mongoose = require('mongoose');
const APIError = require('../utils/APIError');

const notification = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    notificationType: {
        type: String,
        enum: ['newCompany', 'newPromotion', 'message']
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    },
    message: {
        type: String
    }
});

notification.statics = {
    list({
        page = 1,
        perPage = 30,
        name,
        email,
        role,
      }) {
        const options = omitBy({ name, email, role }, isNil);
    
        return this.find(options)
          .sort({ createdAt: -1 })
          .skip(perPage * (page - 1))
          .limit(perPage)
          .exec();
    },
}

module.exports = mongoose.model('Notification', notification);
