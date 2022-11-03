const catchAsync = require('../helpers/catchAsync');
const Airport = require('../models/airportModel');

exports.getAirports = catchAsync(async (req, res, next) => {
  airports = await Airport.find();
  airports.sort((a, b) => {
    if (a.city < b.city) {
      return -1;
    }
    if (a.city > b.city) {
      return 1;
    }
    return 0;
  });
  const results = airports.length;
  res.status(200).json({
    status: 'success',
    results,
    airports
  });
});
