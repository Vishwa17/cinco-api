const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const moment = require('moment')

const promotionSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
  title: {
    type: String,
  },
  description: {
    type: String
  },
  from: {
    type: Date
  },
  to: {
    type: Date
  }
},
  {
    timestamps: true,
  });

promotionSchema.statics = {
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
  list({
    page = 1,
    perPage = 30,
    title,
    from,
    to,
  }) {
    const options = omitBy({ title, from, to }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
  getLatest() {
    const today = moment().startOf('day');
    const options = {
      'from': {
        '$gte': today.toDate()
      }
    };

    return this.find(options).populate('locationId').exec()

  }
}

module.exports = mongoose.model('Promotion', promotionSchema);
