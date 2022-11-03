const catchAsync = require('../helpers/catchAsync');
const Flight = require('../models/flightModel');
const crypto = require('crypto');
exports.getFlights = catchAsync(async (req, res, next) => {
  flights = await Flight.find();
  const results = flights.length;
  res.status(200).json({
    status: 'success',
    results,
    data: flights
  });
});

exports.getTrips = catchAsync(async (req, res, next) => {
  const origin = req.params.origin;
  const date = req.query.date.replace(/['"]+/g, '');
  const budget = req.query.budget;
  const passengers = req.query.passengers;
  const [year, month] = date.split('-');
  const startDate = new Date(`${year}-${month}-1`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  //GET AWAY CANDIDATES
  const awayCandidates = await Flight.find()
    .where({
      origin: origin,
      departureDate: { $gte: startDate },
      stock: { $gte: passengers }
    })
    .and({ departureDate: { $lt: endDate } });

  //GET RETURN CANDIDATES
  const returnCandidates = await Flight.find().where({
    destination: origin,
    departureDate: { $gt: startDate },
    stock: { $gte: passengers }
  });
  //GET TRIPS
  let total;
  let tripDurationDays;
  let trips = [];

  awayCandidates.forEach((awayCandidate) => {
    returnCandidates.forEach((returnCandidate) => {
      if (awayCandidate.destination.city !== returnCandidate.origin.city) {
        return;
      }

      total = (returnCandidate.price + awayCandidate.price) * passengers;
      if (total > budget) {
        return;
      }

      //FILTER TRIPS THAT ARE LESS THAN 2 DAYS LONG AND LONGER THAN 60 DAYS
      tripDurationDays = Math.floor(
        (returnCandidate.departureDate - awayCandidate.departureDate) /
          1000 /
          60 /
          60 /
          24
      );
      if (tripDurationDays < 2 || tripDurationDays > 60) {
        return;
      }

      //CREATE TRIPS
      trips.push({
        id: crypto.randomUUID(),
        total,
        passengers,
        tripDurationDays,
        awayCandidate,
        returnCandidate
      });
    });
  });

  trips.sort((a, b) => {
    if (a.total - b.total < 1) return -1;
    if (a.total - b.total > 1) return 1;
    if (a.total - b.total === 0) return 0;
  });
  const results = trips.length;

  res.status(200).json({
    status: 'success',
    results,
    trips
  });

  // setTimeout(() => {
  //   res.status(200).json({
  //     status: 'success',
  //     results,
  //     trips
  //   });
  // }, 5000);
});
