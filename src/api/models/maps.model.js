const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
var SchemaTypes = mongoose.Schema.Types;
const APIError = require('../utils/APIError');

const mapSchema = new mongoose.Schema({
  location: {
    type: {
      $type: String,
      default: "Point"
    },
    coordinates: {
      $type: [Number],
    },
  },
  icon: {
    $type: String,
    trim: true,
    lowercase: true,
  },
  title: {
    $type: String,
    trim: true,
    text: true,
  },
  description: {
    $type: String,
    trim: true,
    text: true,
  },
  images: [{
    $type: String,
    trim: true
  }],
  locationType: {
    $type: String,
    lowercase: true,
    trim: true
  },
  shortAddress: {
    $type: String,
    lowercase: true,
    trim: true,
    text: true,
  },
  phone: {
    $type: String,
    lowercase: true,
    trim: true
  },
  address: {
    $type: String,
    lowercase: true,
    trim: true,
    text: true,
  },
  email: {
    $type: String,
    lowercase: true,
    trim: true,
    text: true,
  },
  website: {
    $type: String,
    lowercase: true,
    trim: true,
    text: true,
  },
  district: {
    $type: String,
    lowercase: true,
    trim: true
  },
  obs: {
    $type: String,
    lowercase: true,
    trim: true
  },
  availability: {
    $type: String,
    lowercase: true,
    trim: true
  },
  ticket: {
    $type: String,
    lowercase: true,
    trim: true
  },
  sent: {
    $type: String,
    lowercase: true,
    trim: true
  },
  approved: {
    $type: String,
    lowercase: true,
    trim: true
  },
  status: {
    $type: String,
    lowercase: true,
    trim: true
  },
  comment: [{
    userId: mongoose.Schema.Types.ObjectId,
    message: String
  }]
}, { typeKey: '$type' });

mapSchema.index({
  location: '2dsphere',
  title: 'text',
  description: 'text',
  shortAddress: 'text',
  address: 'text',
  email: 'text',
  website: 'text',
  locationType: 'text'
});

mapSchema.statics = {

  async get(id) {
    try {
      let map;

      if (mongoose.Types.ObjectId.isValid(id)) {
        map = await this.findById(id).exec();
      }
      if (map) {
        return map;
      }

      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  list({
    page = 1,
    limit = 30,
    lat,
    lng,
    radius = 1000,
    type
  }) {
    // const options = omitBy({ lat, lng, title }, isNil);
    const toFind = {
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius / 6371]
        }
      }
    };
    // const toFind = {
    //     location: {
    //       $near: {
    //         $geometry: {
    //           type: "Point",
    //           coordinates: [lng, lat]
    //         },
    //         $maxDistance: radius,
    //         $spherical: true
    //       },
    //     }
    //   };

    if (!type.includes('all')) {
      toFind['locationType'] = { $regex: type.join("|"), $options: "i" } ;
    }
    // this.ensureIndex({ location: '2dsphere' })
    return this.find(toFind)
      .sort({ createdAt: -1 })
      .skip(limit * (page - 1))
      .limit(limit)
      .exec();
  },

  async FindOneAndUpdate(query, update) {
    try {
      const location = await this.findOneAndUpdate(query, update).exec();
      if (location) {
        return location
      }

      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (err) {
      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.BAD_REQUEST,
      });
    }
  },

  async FindMultiple(ids) {
    try {
      const locations = await this.find({ _id: { $in: ids } });
      if (locations) {
        return locations
      }
      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (e) {
      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.BAD_REQUEST,
      });
    }
  },

  async search(text) {
    try {
      const locations = await this.find({
        $or: [
          { "title": { "$regex": text, "$options": "i" } },
          { "locationType": { "$regex": text, "$options": "i" } },
          { "shortAddress": { "$regex": text, "$options": "i" } },
          { "address": { "$regex": text, "$options": "i" } },
          { "email": { "$regex": text, "$options": "i" } }
        ]
      });
      if (locations) {
        return locations;
      }
      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (e) {
      console.log('error', e);
      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.BAD_REQUEST,
      });
    }
  },

  async inserts(arr) {
    try {
      const locations = await this.insertMany(arr);
      console.log('locations', locations);
      if (locations) {
        return locations;
      }
      throw new APIError({
        message: 'Some error occurred',
        status: httpStatus.BAD_REQUEST,
      });
    } catch (e) {
      console.log('eeeee', e);
      throw new APIError({
        message: e.errmsg,
        status: httpStatus.BAD_REQUEST,
      });
    }
  },

  async addComment(req) {
    try {
      const { companyId, message, userId } = req;
      console.log('request', req);
      return this.findOneAndUpdate({
        _id: companyId
      }, {
          $push: {
            comment: {
              userId,
              message
            }
          }
        }).exec()
    } catch (e) {
      console.log('eeeee', e);
      throw new APIError({
        message: e.errmsg,
        status: httpStatus.BAD_REQUEST,
      });
    }

  }
}

module.exports = mongoose.model('Location', mapSchema);
