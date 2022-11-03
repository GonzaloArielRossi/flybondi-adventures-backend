const { Schema, model, default: mongoose } = require('mongoose');
const AirportSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'An airport must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        80,
        'A airport name must have less or equal than 80 characters'
      ],
      minlength: [10, 'A airport name must have at least 10 characters']
    },
    city: {
      type: String,
      required: [true, 'An airport must have a city'],
      trim: true,
      maxlength: [
        100,
        'A city name must have less or equal than 100 characters'
      ],
      minlength: [5, 'A city name must have at least 5 characters']
    },
    iata: {
      type: String,
      required: [true, 'An airport must have a iata'],
      trim: true,
      maxlength: [
        5,
        'A airport iata must have less or equal than 5 characters'
      ],
      minlength: [2, 'A airport iata must have at least 2 characters']
    },
    latitude: {
      type: String,
      required: [true, 'A airport must have a latitude'],
      maxlength: [
        12,
        'A airport lat must have less or equal than 12 characters'
      ],
      minlength: [10, 'A airport lat must have at least 10 characters']
    },
    longitude: {
      type: String,
      required: [true, 'A airport must have a latitude'],
      maxlength: [
        12,
        'A airport lng must have less or equal than 12 characters'
      ],
      minlength: [10, 'A airport lng must have at least 10 characters']
    },
    state: {
      type: String,
      required: [true, 'An airport must have a state'],
      trim: true,
      maxlength: [
        150,
        'A airport state must have less or equal than 150 characters'
      ],
      minlength: [2, 'A airport state must have at least 2 characters']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = model('Airport', AirportSchema);
