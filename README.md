# Flybondi Adventures ✈️

![](https://camo.githubusercontent.com/87c0241be85ca2be42708cc329284aead15b9844a06450a4e4f333ea8c55abbb/68747470733a2f2f666c79626f6e64692e636f6d2f6173736574732f696d616765732f6c6f676f2e737667)

## Links 🔗

- [App link 🚀](https://flybondi-adventures-g5pkd64x3-gonzaloarielrossi.vercel.app/)

- [Back-End Repo 🖥️](https://github.com/GonzaloArielRossi/flybondi-adventures-backend)
- [Front-End Repo 🧑‍💻](https://github.com/GonzaloArielRossi/flybondi-adventures)

## Description 📃

This project derives from the "Interview challenge for full stack developers" posted by Flybondi, an Argentinian low-cost airline.
[(Challenge Repo)](https://github.com/flybondi/dev-challenge)

The original idea was to make a simple flight search interface for an old lady that has no particular destiny in mind but it's on a budget.

I decided to take this a step further and created a clone of Flybondi's UI and came up with the concept of "Flybondi Adventures" a flight search engine that allows you to find "random" flights based on your budget. Kind of a "throw a dart at the map" vibe.

The original challenge provided a JSON with flights, but I decided to create my own backend server with a custom database. It consists of a list of all the Argentinian airports that Flybondi operates on, and a list of randomly generated flights that I created with a script.

```
Airport:
    {
        id: String,
        name: String,
        city: String,
        iata: String,
        latitude: String,
        longitude: String,
        state: String
    }

Flight:
    {
        id: String,
        origin: Airport,
        destination: Airport,
        departureDate: Date,
        arrivalDate: Date,
        price: Number,
        stock: Number,
        plane: String
    }

```

After the user "throws" a dart, the app will return all trips available from the city of origin that depart the month the user selected. Trips can go from 2 days long to 60 days long. Results are sorted by total cost (low to high).

## TECH STACKS ⚙️

Front end

- NextJs
- ReactJs
- ChakraUI

Back End

- NodeJS
- Express
- MongoDB
- Mongoose
