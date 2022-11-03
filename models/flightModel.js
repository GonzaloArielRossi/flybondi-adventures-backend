const { Schema, model, default: mongoose } = require('mongoose');
const catchAsync = require('../helpers/catchAsync');
const Airport = require('./airportModel');
const dayjs = require('dayjs');

const flightSchema = new Schema(
  {
    origin: {
      type: Schema.ObjectId,
      ref: 'Airport',
      required: [true, 'A flight must have an origin']
    },
    destination: {
      type: Schema.ObjectId,
      ref: 'Airport',
      required: [true, 'A flight must have a destination']
    },
    departureDate: {
      type: Date
    },
    arrivalDate: {
      type: Date
    },
    price: {
      type: Number,
      min: [1, 'Price should be at lease $1'],
      max: [1000000, `Price can't be more than $1.000.000`]
    },
    stock: {
      type: Number,
      min: [0, 'Stock should be at lease 0'],
      max: [1000, `Stock can't be more than 1000`]
    },
    plane: {
      type: String,
      min: [5, 'Plane should be at lease 5 characters long'],
      max: [7, `Plane can't be more than 7 characters long`]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//Virtuals
flightSchema.virtual('durationInMinutes').get(function () {
  const awayDepartureTime = dayjs(this.departureDate);
  const awayArrivalTime = dayjs(this.arrivalDate);

  return awayDepartureTime.diff(awayArrivalTime, 'minute') * -1;
});

// Populate
flightSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'origin destination',
    select: '-__v -latitude -longitude -state'
  });
  next();
});

module.exports = model('Flight', flightSchema);
