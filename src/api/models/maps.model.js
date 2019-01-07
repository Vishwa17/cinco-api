const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
var SchemaTypes = mongoose.Schema.Types;

const mapSchema = new mongoose.Schema({
  location: {
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [SchemaTypes.Double],
    },
  },
  icon: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: [{
    type: String,
    trim: true
  }],
  type: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }
});

mapSchema.index({ location: '2dsphere' });

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
            $geoWithin : {
                $centerSphere : [[lng,lat], radius / 6371 ]
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

    if( type.toLowerCase() != 'all' ) {
      toFind['type'] = type;
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
      if(location) {
        return location
      }

      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch(err) {
      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.BAD_REQUEST,
      });
    }
  },
}

module.exports = mongoose.model('Locations', mapSchema);
